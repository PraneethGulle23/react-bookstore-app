// src/pages/admin/OrdersList.js
import React, { useEffect, useState } from 'react';
import './OrdersList.css'; // Optional: styling file

const mockOrders = [
  {
    id: 'ORD001',
    customer: { name: 'Alice Johnson', email: 'alice@example.com' },
    items: [
      { title: 'Book A', quantity: 2 },
      { title: 'Book B', quantity: 1 },
    ],
    total: 750,
    status: 'Delivered',
    date: '2025-04-15',
  },
  {
    id: 'ORD002',
    customer: { name: 'Bob Smith', email: 'bob@example.com' },
    items: [{ title: 'Book C', quantity: 1 }],
    total: 300,
    status: 'Pending',
    date: '2025-04-16',
  },
];

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editedCustomer, setEditedCustomer] = useState({ name: '', email: '' });

  useEffect(() => {
    setOrders(mockOrders);
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const startEditing = (order) => {
    setEditingOrderId(order.id);
    setEditedCustomer({ ...order.customer });
  };

  const saveEdits = (orderId) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, customer: { ...editedCustomer } }
          : order
      )
    );
    setEditingOrderId(null);
  };

  const handleView = (order) => {
    alert(JSON.stringify(order, null, 2));
  };

  return (
    <div className="orders-container">
      <h2>📦 Orders List</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Items</th>
            <th>Total (₹)</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>
                {editingOrderId === order.id ? (
                  <>
                    <input
                      type="text"
                      value={editedCustomer.name}
                      onChange={(e) =>
                        setEditedCustomer({ ...editedCustomer, name: e.target.value })
                      }
                    />
                    <input
                      type="email"
                      value={editedCustomer.email}
                      onChange={(e) =>
                        setEditedCustomer({ ...editedCustomer, email: e.target.value })
                      }
                    />
                  </>
                ) : (
                  <>
                    {order.customer.name}
                    <br />
                    <small>{order.customer.email}</small>
                  </>
                )}
              </td>
              <td>
                {order.items.map((item, idx) => (
                  <div key={idx}>
                    {item.title} × {item.quantity}
                  </div>
                ))}
              </td>
              <td>{order.total}</td>
              <td>{order.date}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleView(order)}>🔍 View</button>
                {editingOrderId === order.id ? (
                  <button onClick={() => saveEdits(order.id)}>💾 Save</button>
                ) : (
                  <button onClick={() => startEditing(order)}>✏️ Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersList;
