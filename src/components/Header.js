// src/components/Header.js
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');

  useEffect(() => {
    // Update values whenever the route changes
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    setIsAdmin(localStorage.getItem('isAdmin') === 'true');
  }, [location]); // triggers on route change

  return (
    <header style={styles.header}>
      <h1>📚 My Book Store</h1>
      <nav>
        <ul style={styles.navList}>
          <li><Link to="/" style={styles.navLink}>Home</Link></li>

          {/* Logged in User Navigation */}
          {isLoggedIn && !isAdmin && (
            <>
              <li><Link to="/books" style={styles.navLink}>Books</Link></li>
              <li><Link to="/cart" style={styles.navLink}>Cart</Link></li>
            </>
          )}

          {/* Admin Navigation */}
          {isLoggedIn && isAdmin && (
            <li><Link to="/admin/dashboard" style={styles.navLink}>Admin Dashboard</Link></li>
          )}

          {/* Guest */}
          {!isLoggedIn ? (
            <>
              <li><Link to="/login" style={styles.navLink}>Login</Link></li>
              <li><Link to="/register" style={styles.navLink}>Register</Link></li>
            </>
          ) : (
            <li><Link to="/logout" style={styles.navLink}>Logout</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#6a0dad',
    color: '#fff',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '20px',
  },
  navList: {
    display: 'flex',
    justifyContent: 'flex-end',
    listStyle: 'none',
    padding: 0,
  },
  navLink: {
    color: '#ffeb3b',
    textDecoration: 'none',
    margin: '0 15px',
    fontWeight: 'bold',
    fontSize: '16px',
    transition: 'color 0.3s ease',
  },
};

export default Header;
