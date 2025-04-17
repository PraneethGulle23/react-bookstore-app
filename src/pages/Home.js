// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    if (role === 'admin') {
      navigate('/admin/login');
    } else {
      navigate('/login');
    }
  };

  return (
    <div style={styles.container}>
      <h1>Welcome to Book Store</h1>
      <p>Choose your role to continue</p>
      <button onClick={() => handleRoleSelection('customer')} style={styles.button}>Login as Customer</button>
      <button onClick={() => handleRoleSelection('admin')} style={styles.button}>Login as Admin</button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#f1f1f1',
  },
  button: {
    margin: '10px',
    padding: '15px 30px',
    backgroundColor: '#6a0dad',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default Home;
