import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Shared Components
import Header from './components/Header';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import CartPage from './components/CartPage';
import Logout from './pages/Logout';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Billing from './pages/Billing';
import RoleSelection from './pages/RoleSelection';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard'; // ✅ Admin Dashboard

// Admin Pages
import ManageBooks from './pages/admin/ManageBooks';
import ManageUsers from './pages/admin/ManageUsers';
import OrdersList from './pages/admin/OrdersList';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Default Landing Page */}
        <Route path="/" element={<RoleSelection />} />

        {/* Public Routes */}
        <Route path="/books" element={<BookList />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/logout" element={<Logout />} />

        {/* User Routes */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/billing" element={<Billing />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/manage-books" element={<ManageBooks />} />
        <Route path="/admin/manage-users" element={<ManageUsers />} />
        <Route path="/admin/orders" element={<OrdersList />} />
      </Routes>
    </Router>
  );
};

export default App;
