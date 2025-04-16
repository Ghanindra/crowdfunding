// src/components/AllPayments.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./allPayments.css"; // Optional: For styling

const AllPayments = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/payments");
        setDonations(res.data.donations);
        console.log(res.data.donations);
        
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch payments", err);
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) return <div>Loading all payment transactions...</div>;

  return (
    <div className="admin-payment-container">
      <h2>All Payment Transactions</h2>
      {donations.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table className="admin-payment-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Campaign</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Date</th>
            </tr>
          </thead>
         <tbody>
  {donations.map((txn) => (
    <tr key={txn?._id}>
      <td>{txn?.userId?.username || "Unknown"}</td>
      <td>{txn?.userId?.email || "N/A"}</td>
      <td>{txn?.campaignId?.title || "Unknown Campaign"}</td>
      <td>${txn?.amount}</td>
      <td>Esewa</td>
      <td>{txn?.createdAt ? new Date(txn.createdAt).toLocaleDateString() : "N/A"}</td>
    </tr>
  ))}
</tbody>
        </table>
      )}
    </div>
  );
};

export default AllPayments;
