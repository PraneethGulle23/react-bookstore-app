// src/components/CartPage.js
import React, { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch the cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartItems);
  }, []);

  const removeFromCart = (bookId) => {
    const updatedCart = cart.filter((id) => id !== bookId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const checkout = () => {
    // Implement checkout logic here, for now, just show an alert
    alert('Proceeding to checkout');
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        <div>
          <ul>
            {cart.map((bookId) => (
              <li key={bookId}>
                <span>Book {bookId}</span>
                <button onClick={() => removeFromCart(bookId)}>Remove</button>
              </li>
            ))}
          </ul>
          <button onClick={checkout}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
