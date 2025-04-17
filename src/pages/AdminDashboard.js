import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css'; // We'll slightly improve styles too

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Welcome, Admin!</h1>
      <div className="admin-options">
        <Link to="/admin/manage-books" className="admin-card">
          📚 Manage Books
        </Link>
        <Link to="/admin/manage-users" className="admin-card">
          👥 Manage Users
        </Link>
        <Link to="/admin/orders" className="admin-card">
          📦 View Orders
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
