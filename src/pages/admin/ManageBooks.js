import React, { useEffect, useState } from 'react';

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    category: '',
    price: '',
  });

  useEffect(() => {
    const dummyBooks = [
      { id: 1, title: 'Atomic Habits', author: 'James Clear', category: 'Self-help', price: 350 },
      { id: 2, title: 'The Alchemist', author: 'Paulo Coelho', category: 'Fiction', price: 299 },
      { id: 3, title: 'Sapiens', author: 'Yuval Noah Harari', category: 'History', price: 499 },
    ];
    setBooks(dummyBooks);
  }, []);

  const handleInputChange = (e) => {
    setNewBook({
      ...newBook,
      [e.target.name]: e.target.value
    });
  };

  const handleAddBook = (e) => {
    e.preventDefault();

    const newBookWithId = {
      ...newBook,
      id: Date.now(),
      price: parseFloat(newBook.price),
    };

    setBooks(prev => [...prev, newBookWithId]);

    // Clear form
    setNewBook({
      title: '',
      author: '',
      category: '',
      price: '',
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      setBooks(prev => prev.filter(book => book.id !== id));
    }
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📚 Manage Books</h2>

      {/* Add Book Form */}
      <form onSubmit={handleAddBook} style={styles.form}>
        <input type="text" name="title" placeholder="Title" value={newBook.title} onChange={handleInputChange} required style={styles.input} />
        <input type="text" name="author" placeholder="Author" value={newBook.author} onChange={handleInputChange} required style={styles.input} />
        <input type="text" name="category" placeholder="Category" value={newBook.category} onChange={handleInputChange} required style={styles.input} />
        <input type="number" name="price" placeholder="Price" value={newBook.price} onChange={handleInputChange} required style={styles.input} />
        <button type="submit" style={styles.addButton}>➕ Add Book</button>
      </form>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by title or author"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.search}
      />

      {/* Book Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Author</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.length > 0 ? filteredBooks.map(book => (
            <tr key={book.id}>
              <td style={styles.td}>{book.title}</td>
              <td style={styles.td}>{book.author}</td>
              <td style={styles.td}>{book.category}</td>
              <td style={styles.td}>₹{book.price}</td>
              <td style={styles.td}>
                <button style={styles.editBtn}>Edit</button>
                <button onClick={() => handleDelete(book.id)} style={styles.deleteBtn}>Delete</button>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="5" style={styles.td}>No books found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
  },
  heading: {
    fontSize: '28px',
    color: '#6a0dad',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  },
  input: {
    padding: '10px',
    width: '200px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  search: {
    padding: '10px',
    width: '300px',
    marginBottom: '20px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    border: '1px solid #ccc',
    padding: '12px',
    backgroundColor: '#f5f5f5',
    fontWeight: 'bold',
  },
  td: {
    border: '1px solid #ccc',
    padding: '10px',
    textAlign: 'center',
  },
  editBtn: {
    marginRight: '10px',
    padding: '6px 12px',
    backgroundColor: '#0288d1',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  deleteBtn: {
    padding: '6px 12px',
    backgroundColor: '#e53935',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default ManageBooks;
