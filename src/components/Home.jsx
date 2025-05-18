import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Products from './Products'

export default function Home({products, isAuthenticated, setIsAuthenticated, setUserName,  userName, cart, setCart, setOrders}) {

  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu
  const nav = useNavigate(); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
  };

  function handleLogOut(){   
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
    setIsAuthenticated(false)
    setUserName('');
    nav('/');  
  }

  return (
    <div>
      <div className='navbar'>
        <div className='rightSide'>
          <h1>ברוכים הבאים ל-sv shop</h1>
        </div>    

        <div className={`leftSide ${isMenuOpen ? 'open' : ''}`}>
        {!isAuthenticated ?(
          <>
            <Link to='sign in'><button>כניסה</button> </Link>
            <Link to='sign up'><button>הרשמה</button> </Link>
          </>
        ):(
         
            <button onClick={handleLogOut}>התנתק</button>
        )}
        </div>
        
        {/* Hamburger Icon */}
        <button className="hamburger" onClick={toggleMenu}>
          <img src="assets/images/hamburger.png" alt="Menu" />
        </button>
        
      </div>      
        <Products products={products} isAuthenticated={isAuthenticated} userName={userName} cart={cart} setCart={setCart} setOrders={setOrders} /> 
    </div>
  )
}
