import React, { useEffect, useState } from 'react';

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    // Dummy user-based filter
    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const user = localStorage.getItem('currentUser');
    const filtered = allOrders.filter(order => order.customerName === user);
    setMyOrders(filtered);
  }, []);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      {myOrders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {myOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.totalAmount}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyOrders;
