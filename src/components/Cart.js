import React from 'react';

const Cart = () => {
  const cartItems = []; // Replace with actual cart data
  return (
    <div style={styles.container}>
      <h2>Your Cart</h2>
      <ul>
        {cartItems.length === 0 ? (
          <p>No items in the cart.</p>
        ) : (
          cartItems.map((item, index) => (
            <li key={index}>{item.title} - ₹{item.price}</li>
          ))
        )}
      </ul>
      <button style={styles.button}>Proceed to Checkout</button>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#6a0dad',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default Cart;
