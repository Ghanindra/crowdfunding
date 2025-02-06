import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import './adminnotification.css'; // Import CSS file

const socket = io('http://localhost:5000'); // Adjust backend URL

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loadingIds, setLoadingIds] = useState({});
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    fetchNotifications();

    socket.on('new_verification', (newNotification) => {
      console.log('Received new notification:', newNotification);
      setNotifications((prev) => [newNotification, ...prev]);
    });

    return () => socket.off('new_verification');
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/notifications');
      console.log('notificatons',response.data)
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };
// Handle click on notification to fetch details
const handleNotificationClick = async (notificationId) => {
  try {
    const response = await axios.get(`/api/admin/notifications/${notificationId}`);
    setSelectedNotification(response.data);
  } catch (error) {
    console.error("Error fetching notification details:", error);
  }
};
  const handleUpdateNotificationStatus = async (id, status) => {
    setLoadingIds((prev) => ({ ...prev, [id]: true }));

    try {
      await axios.put(`http://localhost:5000/api/admin/notifications/${id}`, { status });
      //  Remove the approved/rejected notification from the UI
    setNotifications((prev) => prev.filter((notification) => notification._id !== id));
      alert(`Notification ${status} successfully!`);
    
    } catch (error) {
      console.error('Error updating notification status:', error);
      alert('Failed to update notification status.');
    } finally {
      setLoadingIds((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="admin-notifications">
      <h2> Notifications</h2>
      {notifications.length === 0 ? (
        <p className="no-notifications">No notifications available.</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification._id}>
              <p onClick={() => handleNotificationClick(notification._id)}>
              {notification.username} is requesting verification
            </p>
            
{selectedNotification && (
        <div>
          <h3>Verification Details</h3>
          <p>Document Number: {selectedNotification.documentNumber}</p>
          <p>Issue Date: {selectedNotification.issueDate}</p>
          <p>Issued From: {selectedNotification.issuedFrom}</p>
          <img src={selectedNotification.citizenshipImage} alt="Citizenship" />
        </div>
      )}

              <div className="btn-group">
                <button
                  onClick={() => handleUpdateNotificationStatus(notification._id, 'approved')}
                  disabled={loadingIds[notification._id]}
                  className="approve-btn"
                >
                  {loadingIds[notification._id] ? 'Approving...' : 'Approve'}
                </button>
                <button
                  onClick={() => handleUpdateNotificationStatus(notification._id, 'rejected')}
                  disabled={loadingIds[notification._id]}
                  className="reject-btn"
                >
                  {loadingIds[notification._id] ? 'Rejecting...' : 'Reject'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminNotifications;

