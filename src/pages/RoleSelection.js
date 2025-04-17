// src/pages/RoleSelection.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    if (role === 'customer') {
      navigate('/login'); // Redirect to customer login
    } else if (role === 'admin') {
      navigate('/admin/login'); // Redirect to admin login
    }
  };

  return (
    <div style={styles.container}>
      <h2>Welcome! Please select your role to proceed</h2>
      <div>
        <button onClick={() => handleRoleSelection('customer')} style={styles.button}>
          Login as Customer
        </button>
        <button onClick={() => handleRoleSelection('admin')} style={styles.button}>
          Login as Admin
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  button: {
    margin: '10px',
    padding: '10px 20px',
    backgroundColor: '#6a0dad',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default RoleSelection;
