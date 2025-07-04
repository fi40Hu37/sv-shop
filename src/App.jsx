import { useState, useEffect } from 'react'
import { Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Products from './components/Products'
import Buy from './components/Buy'
import './App.css'
import Orders from './components/Orders'
import Footer from './components/Footer'

function App() {

  const products = [
    {id:1, product: "חלב תנובה", price:5, imgURL: "assets/images/milk.webp"},
    {id:2, product: "סוכר", price:4.50, imgURL: "assets/images/sugar.webp"} ,
    {id:3, product: "ביצים", price:12, imgURL: "assets/images/eggs.webp"},
    {id:4, product: "אורז",price: 10, imgURL: "assets/images/rice.webp"}, 
    {id:5, product: "בשר טחון" ,price: 30, imgURL: "assets/images/mince.webp"},
    {id:6, product: "דג פורל נקי טרי", price:30, imgURL: "assets/images/fish.webp"},
    {id:7, product: "יוגורט", price: 4, imgURL: "assets/images/yogurt.webp"},  
    {id:8, product:"עגבניה", price:6,imgURL: "assets/images/tomato.webp"},    
    {id:9, product: "קמח", price:3.50, imgURL: "assets/images/flour.webp"}
  ]
  const [allUsers, setAllUsers] = useState([{email:"", password:""}])
  const [cart, setCart] = useState([]); 
  const [orders, setOrders] = useState([]);

  const addUser = (userName, email, password) => {
    setAllUsers(prevUsers => [...prevUsers, { userName, email, password }]);
    console.log("משתמש נוסף", { email, password });
  };    

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('userName') || '';
  });


  useEffect(() => {
    // This will run only once, when the app mounts
    if (localStorage.getItem('isAuthenticated') === 'true') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
    
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  return (
    <div className="App" dir="rtl">
    <div className='general-content'>
     <Routes>
       <Route path="/" element={<Home products={products} userName={userName} setUserName={setUserName} setOrders={setOrders} cart={cart} setCart={setCart} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>} />
       <Route path='/sign up' element={<SignUp addUser={addUser}/>}/> 
       <Route path='/sign in' element={<SignIn allUsers={allUsers} setIsAuthenticated={setIsAuthenticated} setUserName={setUserName}/>}/>
       <Route path='/products' element={<Products products={products} userName={userName} setOrders={setOrders}  cart={cart} setCart={setCart} isAuthenticated={isAuthenticated}/>}/>
       <Route path='/buy' element={<Buy setOrders={setOrders} userName={userName} allUsers={allUsers} cart={cart} setCart={setCart} isAuthenticated={isAuthenticated}/>}/>
       <Route path='/orders' element={<Orders orders={orders} userName={userName} isAuthenticated={isAuthenticated}/>}/>
     </Routes>
     <Footer/>
    </div>

  </div>
  )
}

export default App
