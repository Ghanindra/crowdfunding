

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./notificationdetails.css";

const NotificationDetails = () => {
  const { id } = useParams();
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotificationDetails();
  }, [id]);

  const fetchNotificationDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/notifications/${id}`);
      console.log("API Response:", response.data);
      setNotification(response.data); // Directly set the single notification
    } catch (error) {
      console.error("Error fetching notification details:", error);
    }
  };

  const handleUpdateStatus = async (status) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/notifications/${id}`, { status });
      alert(`Notification ${status} successfully!`);
      navigate("/admin/notifications"); // Redirect back to notifications list
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update notification status.");
    }
  };

  if (!notification) {
    return <p>Loading notification details...</p>;
  }

  console.log("Notification state in frontend:", notification);

  return (
    <div className="notification-details">
      <h2>Verification Details</h2>
      <p><strong>Username:</strong> {notification.username || "N/A"}</p>
      <p><strong>Document Number:</strong> {notification.documentNumber || "N/A"}</p>
      <p><strong>Issue Date:</strong> {notification.issueDate || "N/A"}</p>
      <p><strong>Issued From:</strong> {notification.issuedFrom || "N/A"}</p>

      {notification.citizenshipImage ? (
        <img
          src={notification.citizenshipImage}
          alt="Citizenship"
          style={{ width: "200px", height: "auto" }}
        />
      ) : (
        <p>No image available</p>
      )}

      <div className="btn-group">
        <button onClick={() => handleUpdateStatus("approved")} className="approve-btn">
          Approve
        </button>
        <button onClick={() => handleUpdateStatus("rejected")} className="reject-btn">
          Reject
        </button>
      </div>
    </div>
  );
};

export default NotificationDetails;
