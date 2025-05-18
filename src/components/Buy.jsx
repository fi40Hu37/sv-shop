import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Buy({ setOrders, isAuthenticated, userName, allUsers, setCart }) {
  const location = useLocation();
  const nav = useNavigate();
  const { cart = [] } = location.state || { };

  useEffect(() => {
    if (!isAuthenticated) {
      alert("אנא התחבר לפני הרכישה");
      nav("/sign in");
    } else if (!cart || cart.length === 0) {
      alert("העגלה ריקה");
      nav("/products");
    }
  }, [isAuthenticated, cart, nav]);

  const user = allUsers.find(user => user.userName === userName);

  const handlePlaceOrder = () => {
      if (!user) {
        alert("משתמש לא נמצא!");
        return;
      }
      
      const newOrder = {
        id: Date.now(),
        userName: user.userName, // שים את זה ישירות
        products: [...cart],     // אל תקרא לזה items
        date: new Date().toLocaleString()
      };

      setOrders(prevOrders => {
        const updatedOrders = [...prevOrders, newOrder];
        localStorage.setItem("orders", JSON.stringify(updatedOrders)); // Save orders persistently
        return updatedOrders;
      });
      // Clear the cart after placing the order
      setCart([]);
      alert('הזמנה עברה בהצלחה!');
      nav('/orders'); 
    }

  return (
    <div className='buy'>
      <h1>תשלום</h1>
      <h2>עגלת קנייה</h2>
      <ul className='containerSum'>
        {cart.map(item => (
          <li key={item.id}>
            {item.product} - ₪{item.price} x {item.quantity}
          </li>
        ))}
      </ul>
      <h3>סך הכל: ₪{cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}</h3>
      <button onClick={handlePlaceOrder}>צור הזמנה</button>
      <button onClick={() => nav('/')}>בטל הזמנה</button>
    </div>
  );
}
