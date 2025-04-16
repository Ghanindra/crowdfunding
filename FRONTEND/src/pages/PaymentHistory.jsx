// PaymentHistory.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './paymentHistory.css';

const PaymentHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/my-payments', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth-token')}`
          }
        });
        setHistory(res.data);
      } catch (err) {
        console.error("Error fetching payment history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="payment-history-container">
      <h2>My Payment History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : history.length === 0 ? (
        <p>No payment history found.</p>
      ) : (
        <table className="payment-table">
          <thead>
            <tr>
              <th>Campaign</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((payment) => (
              <tr key={payment._id}>
                <td>{payment.campaignId?.title || "N/A"}</td>
                <td>${payment.amount}</td>
                <td>Esewa</td>
                <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentHistory;
