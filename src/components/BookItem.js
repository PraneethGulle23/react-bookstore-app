// src/components/BookItem.js
import React from 'react';

const BookItem = ({ title, author }) => {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.author}>by {author}</p>
      <button style={styles.btn}>View Details</button>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    padding: '20px',
    margin: '15px',
    width: '280px',
    borderRadius: '10px',
    backgroundColor: '#fdfdfd',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    fontFamily: 'Segoe UI, sans-serif',
  },
  title: {
    color: '#333',
    marginBottom: '10px',
  },
  author: {
    color: '#777',
    fontStyle: 'italic',
    marginBottom: '15px',
  },
  btn: {
    backgroundColor: '#6a0dad',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default BookItem;
