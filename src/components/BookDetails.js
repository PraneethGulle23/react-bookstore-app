// src/components/BookDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    // Fetch book details by ID
    fetch(`http://localhost:5000/api/books/${id}`) // Replace with your API URL
      .then((response) => response.json())
      .then((data) => setBook(data));
  }, [id]);

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(id);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Book added to cart');
  };

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div className="book-details">
      <h2>{book.title}</h2>
      <p>{book.description}</p>
      <p>Price: ${book.price}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default BookDetails;
