import React, { useState, useEffect } from 'react';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'User',
  });

  useEffect(() => {
    const dummyUsers = [
      { id: 1, name: 'Alice', email: 'alice@example.com', role: 'User' },
      { id: 2, name: 'Bob', email: 'bob@example.com', role: 'Admin' },
      { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'User' },
    ];
    setUsers(dummyUsers);
  }, []);

  const handleInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const newUserWithId = {
      ...newUser,
      id: Date.now(),
    };
    setUsers(prev => [...prev, newUserWithId]);

    // Clear form
    setNewUser({
      name: '',
      email: '',
      role: 'User',
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this user?")) {
      setUsers(prev => prev.filter(user => user.id !== id));
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>👥 Manage Users</h2>

      {/* Add User Form */}
      <form onSubmit={handleAddUser} style={styles.form}>
        <input type="text" name="name" placeholder="Name" value={newUser.name} onChange={handleInputChange} required style={styles.input} />
        <input type="email" name="email" placeholder="Email" value={newUser.email} onChange={handleInputChange} required style={styles.input} />
        <select name="role" value={newUser.role} onChange={handleInputChange} style={styles.input}>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit" style={styles.addButton}>➕ Add User</button>
      </form>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.search}
      />

      {/* User Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Role</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? filteredUsers.map(user => (
            <tr key={user.id}>
              <td style={styles.td}>{user.name}</td>
              <td style={styles.td}>{user.email}</td>
              <td style={styles.td}>{user.role}</td>
              <td style={styles.td}>
                <button onClick={() => handleDelete(user.id)} style={styles.deleteBtn}>Delete</button>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="4" style={styles.td}>No users found.</td></tr>
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
  deleteBtn: {
    padding: '6px 12px',
    backgroundColor: '#e53935',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default ManageUsers;
