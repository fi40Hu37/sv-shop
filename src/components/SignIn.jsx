import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

export default function SignIn({allUsers, setIsAuthenticated, setUserName, userName}) {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const nav = useNavigate()
  
  function checkUser() {
    // Find the user object with the matching username
    const user = allUsers.find((user) => user.email === email && user.password === password);

    // If no user is found
    if (!user) {
      alert('משתמש לא קיים');
      return;
    }
    
    alert("התחברת בהצלחה!");
    setIsAuthenticated(true)
    setUserName(user.userName); // Set the username
    // Store login info persistently
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userName', user.userName);
    console.log("userName:", userName);
    console.log("Matching user:", user);
    nav('/');  
}
  return (
    <div className="enterUser">
      <h1>איזה כייף שבאת ל-SV Shop</h1>
      <input type="text" placeholder="כתובת מייל" onChange={e => setEmail(e.target.value)}/>
      <input type="password" placeholder="סיסמה" onChange={e => setPassword(e.target.value)}/>
      <button onClick={checkUser}>כניסה</button>
      <p id="noAccount"> אין לך חשבון עדיין?</p>
      <Link to="/sign up" > להרשמה </Link> 
    </div>
  )
}
