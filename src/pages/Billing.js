// src/components/Billing.js
import React, { useState, useEffect } from 'react';

const Billing = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartItems);

    // Assuming each book costs $10, just for demonstration
    setTotalPrice(cartItems.length * 10);
  }, []);

  const placeOrder = () => {
    alert('Order placed successfully');
    localStorage.removeItem('cart'); // Clear cart after order
    setCart([]);
  };

  return (
    <div className="billing-page">
      <h2>Billing Summary</h2>
      {cart.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        <div>
          <ul>
            {cart.map((bookId, index) => (
              <li key={index}>Book {bookId}</li>
            ))}
          </ul>
          <p>Total: ${totalPrice}</p>
          <button onClick={placeOrder}>Place Order</button>
        </div>
      )}
    </div>
  );
};

export default Billing;
