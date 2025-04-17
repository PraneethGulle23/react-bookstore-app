// src/components/BookList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch the list of books from the backend
    fetch('http://localhost:5000/api/books') // Replace with your API URL
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

  const addToCart = (bookId) => {
    // Add book to cart logic
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(bookId);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Book added to cart');
  };

  return (
    <div className="book-list">
      <h2>Books</h2>
      <div className="books">
        {books.map((book) => (
          <div key={book.id} className="book-item">
            <img src={book.imageUrl} alt={book.title} />
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <Link to={`/book/${book.id}`} className="view-details">View Details</Link>
            <button onClick={() => addToCart(book.id)} className="add-to-cart">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
