import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Orders({ userName, orders = [], isAuthenticated }) {
  const nav = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      alert("עליך להתחבר כדי לצפות בהזמנות");
      nav("/sign in");
    }
  }, [isAuthenticated, nav]);
  
  const userOrders = orders.filter(order => order.userName === userName);

  if (userOrders.length === 0) {
    console.log("userName:", userName);
    console.log("orders:", orders);
    return <p>אין לך הזמנות עדיין.</p>;
  }

  return (
    <div className='buy'>
      <h1>ההזמנות שלך</h1>
        {userOrders.map((order, index) => (
          <div key={index} className="containerSum">
            <h2>הזמנה מתאריך: {order.date}</h2>
            <ul>
              {order.products.map(item => (
                <li key={item.id}>
                  {item.product} - ₪{item.price} (כמות: {item.quantity})
                </li>
              ))}
            </ul>
          </div>
        ))}

        <button onClick={() => nav('/')}>חזרה לעמוד הבית</button>
    </div>
  );
}
