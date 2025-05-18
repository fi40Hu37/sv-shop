import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

export default function SignUp({addUser}) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const nav = useNavigate()

  function checkSignUp(){
    let isValid = true;

    //check userName
    for (let i = 0; i < username.length; i++){
      const char = username[i];
      const charCode = char.charCodeAt(0); // Get Unicode value
      if (
        !(
          (char >= 'A' && char <= 'Z') ||
          (char >= 'a' && char <= 'z') ||
          (charCode >= 0x0590 && charCode <= 0x05FF) ||
          (char >= '0' && char <= '9') 
        )
      ){
        isValid = false;
        alert('שם משתמש חייב להכיל רק אותיות ומספרים');
      } 
      if (!(char.length < 4 || char.length > 15))
      {
        isValid = false;
        alert('שם משתמש חייב להיות בין 4-15 תווים');
      }
      // if((char.includes(" "))) 
      // {
      //   isValid = false;
      //   alert('Username should not contain spaces.');
      // }
      break;
    }
  
    //check email
    for (let i = 0; i < email.length; i++){
      const char = email[i];
      if (!email.includes("@")){ 
        isValid = false; // Must have "@"
        alert('מייל חייב להכיל @');}
      const parts = email.split("@");
      if (parts.length !== 2){
        isValid = false; // Must have only one "@"
        alert('מייל חייב להכיל רק @ אחד');}
      
      const [local, domain] = parts;
      if (local.length === 0 || domain.length === 0){
        isValid = false; // Must have text before and after "@"
        alert('חייבים להיות תווים לפני ואחרי @');}
      if (!domain.includes(".")){
        isValid = false; // Domain must have a dot (".")
        alert('מייל חייב להכיל .');}
      const domainParts = domain.split(".");
      if (domainParts.some(part => part.length === 0)){
        isValid = false; // No empty parts like "test@.com"
        alert('אסור להכיל חוסרים');}

    break;
    }

    //check password
    for (let i = 0; i < password.length; i++){
      const char = password[i];
      const charCode = char.charCodeAt(0); // Get Unicode value
      if (
        !(
          (char >= 'A' && char <= 'Z') ||
          (char >= 'a' && char <= 'z') ||
          (charCode >= 0x0590 && charCode <= 0x05FF) ||
          (char >= '0' && char <= '9') 
        )
      ){
        isValid = false;
        alert('סיסמא חייבת להכיל רק אותיות ומספרים');
      } 
      if (!(char.length < 4 || char.length > 15))
      {
        isValid = false;
        alert('סיסמא חייבת להיות בין 4-15 תווים');
      }
      // if(!(char.includes(" "))) 
      // {
      //   isValid = false;
      //   alert('password should not contain spaces.');
      // }
      break;
    }

    if (isValid) {
      setUsername(username)
      setEmail(email)
      setPassword(password)
      addUser(username, email, password)
      nav('/sign in')
    } 
  }

  
  return (
    <div className="enterUser">
      <h1 id="headerSignup">הרשמה ל-SV Shop</h1>
      <h2>שמחים שבאת!</h2>      
      <h2> רק כמה פרטים שנכיר אותך </h2>
      <input type="text" placeholder="שם מלא" onChange={e => setUsername(e.target.value)}/>
      <input type="text" placeholder="כתובת מייל" onChange={e => setEmail(e.target.value)}/>
      <input type="password" placeholder="סיסמה" onChange={e => setPassword(e.target.value)}/>
      <button onClick={checkSignUp}>הרשמה</button>
      <Link to="/" > חזרה לאתר </Link> 
    </div>
  )
}
