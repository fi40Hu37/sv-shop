import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Products({ products, userName, isAuthenticated, setOrders, cart, setCart }) {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [quantities, setQuantities] = useState({}); // Track product quantities
  const [quantitiesInitialized, setQuantitiesInitialized] = useState(false);
  const nav = useNavigate();

  // Initialize quantities for each product
  useEffect(() => {
    if (!quantitiesInitialized && products.length > 0) {
      const initialQuantities = {};
      products.forEach(product => {
        initialQuantities[product.id] = 0;
      });
      setQuantities(initialQuantities);
      setQuantitiesInitialized(true); // prevent reinitialization
    }
  }, [products, quantitiesInitialized]);


  useEffect(() => {
    let updatedProducts = [...products];
    if (searchTerm) {
      updatedProducts = updatedProducts.filter(product =>
        product.product.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOption === 'byName') {
      updatedProducts.sort((a, b) => a.product.localeCompare(b.product));
    } else if (sortOption === 'byPrice') {
      updatedProducts.sort((a, b) =>  Number(a.price) -  Number(b.price));
    }

    setFilteredProducts(updatedProducts);
  }, [searchTerm, sortOption, products]);


  const handleAddToCart = (productId) => {
    const product = products.find(p => p.id === productId);//Look up the full product object in products 
    if (product) {
      setCart(prevCart => {
        const existingItem = prevCart.find(item => item.id === productId);//Check if the product is already in the cart.
        if (existingItem) {
          return prevCart.map(item =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prevCart, { ...product, quantity: 1 }];
      });

      // Update the quantity in real-time
      setQuantities(prevQuantities => ({
        ...prevQuantities,
        [productId]: (prevQuantities[productId] || 0) + 1,
      }));
      }
    };

  const handleNavigateToBuy = () => {
    if (!isAuthenticated) {
      alert("אנא התחבר לפני רכישה");
      nav("/sign in");
      return;
    }

    if (cart.length === 0) {
      alert("העגלה ריקה!");
      return;
    }

    setCart([]); // clear cart
    setQuantities({}); // clear quantities
    nav('/buy', { state: { cart },  userName});
    
  };

  return (
    <div>
      <div>
        <h1>מוצרים:</h1>
        <select className='selectBy' value={sortOption} onChange={e => setSortOption(e.target.value)}>
          <option value="">מיין לפי</option>
          <option value="byName">שם</option>
          <option value="byPrice">מחיר</option>
        </select>
        <input
          type="text"
          value={searchTerm}
          className='search'
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="חפש מוצרים"
        />
      </div>
      <div className='products-container'>
        {filteredProducts.map(product => (
          <div key={product.id} className='product'>
            <h2>{product.product}</h2>
            <img src={product.imgURL} alt={product.product} className='product-Image'/>
            <p>₪{product.price}</p>
            <button onClick={() => handleAddToCart(product.id)}>הוסף לעגלה</button>
            <p>נוסף: {quantities[product.id] || 0}</p> {/* Display current quantity */}
          </div>
        ))}
      </div>
      <button className='pay' onClick={handleNavigateToBuy}>המשך לתשלום</button>
    </div>
  );
}

