// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import io from 'socket.io-client';
// import './adminnotification.css'; // Import CSS file

// const socket = io('http://localhost:5000'); // Adjust backend URL

// const AdminNotifications = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [loadingIds, setLoadingIds] = useState({});
//   const [selectedNotification, setSelectedNotification] = useState(null);

//   useEffect(() => {
//     fetchNotifications();

//     socket.on('new_verification', (newNotification) => {
//       console.log('Received new notification:', newNotification);
//       setNotifications((prev) => [newNotification, ...prev]);
//     });

//     return () => socket.off('new_verification');
//   }, []);

//   const fetchNotifications = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/admin/notifications/:id');
//       console.log('notificatons',response.data)
//       setNotifications(response.data);
//     } catch (error) {
//       console.error('Error fetching notifications:', error);
//     }
//   };
// // Handle click on notification to fetch details

// const handleNotificationClick = async (id) => {
//   try {
//     const response = await axios.get(`http://localhost:5000/api/admin/notifications/${id}`);
//     console.log('API Response Data:', response.data);

//     if (Array.isArray(response.data) && response.data.length > 0) {
//       setSelectedNotification(response.data[0]); // Access the first object in the array
//       console.log("Updated selectedNotification:", response.data[0]);
//     } else {
//       console.warn("No notification data received.");
//     }
//   } catch (error) {
//     console.error("Error fetching notification details:", error);
//   }
// };

//   const handleUpdateNotificationStatus = async (id, status) => {
//     setLoadingIds((prev) => ({ ...prev, [id]: true }));

//     try {
//       await axios.put(`http://localhost:5000/api/admin/notifications/${id}`, { status });
//       //  Remove the approved/rejected notification from the UI
//     setNotifications((prev) => prev.filter((notification) => notification._id !== id));
//       alert(`Notification ${status} successfully!`);
    
//     } catch (error) {
//       console.error('Error updating notification status:', error);
//       alert('Failed to update notification status.');
//     } finally {
//       setLoadingIds((prev) => ({ ...prev, [id]: false }));
//     }
//   };

//   return (
//     <div className="admin-notifications">
//   <h2>Notifications</h2>
  
//   {notifications.length === 0 ? (
//     <p className="no-notifications">No notifications available.</p>
//   ) : (
//     <ul>
//       {notifications.map((notification) => (
//         <li key={notification._id}>
//           <p onClick={() => handleNotificationClick(notification._id)}>
//             {notification.username} is requesting verification
//           </p>
//           <div className="btn-group">
//             <button
//               onClick={() => handleUpdateNotificationStatus(notification._id, 'approved')}
//               disabled={loadingIds[notification._id]}
//               className="approve-btn"
//             >
//               {loadingIds[notification._id] ? 'Approving...' : 'Approve'}
//             </button>
//             <button
//               onClick={() => handleUpdateNotificationStatus(notification._id, 'rejected')}
//               disabled={loadingIds[notification._id]}
//               className="reject-btn"
//             >
//               {loadingIds[notification._id] ? 'Rejecting...' : 'Reject'}
//             </button>
//           </div>
//         </li>
//       ))}
//     </ul>
//   )}

//   {/* Moved selected notification details outside the list */}
//   {selectedNotification && (
//     <div className="notification-details">
//       <h3>Verification Details</h3>
//       <p><strong>Document Number:</strong> {selectedNotification.documentNumber || "N/A"}</p>
//       <p><strong>Issue Date:</strong> {selectedNotification.issueDate || "N/A"}</p>
//       <p><strong>Issued From:</strong> {selectedNotification.issuedFrom || "N/A"}</p>
//       {selectedNotification.citizenshipImage ? (
//         <img src={selectedNotification.citizenshipImage} alt="Citizenship" style={{ width: "200px", height: "auto" }} />
//       ) : (
//         <p>No image available</p>
//       )}
//     </div>
//   )}
// </div>


//   );
// };

// export default AdminNotifications;


import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import "./adminnotification.css";

const socket = io("http://localhost:5000"); // Adjust backend URL

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loadingIds, setLoadingIds] = useState({});
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    fetchNotifications();

    socket.on("new_verification", (newNotification) => {
      console.log("Received new notification:", newNotification);
      setNotifications((prev) => [newNotification, ...prev]);
    });

    return () => socket.off("new_verification");
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/notifications/:id");
      console.log("notifications", response.data);
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Handle click on notification to fetch details
  const handleNotificationClick = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/notifications/${id}`);
      console.log("API Response Data:", response.data);

      if (Array.isArray(response.data) && response.data.length > 0) {
        setSelectedNotification(response.data[0]); // Access the first object in the array
        console.log("Updated selectedNotification:", response.data[0]);
      } else {
        console.warn("No notification data received.");
      }
    } catch (error) {
      console.error("Error fetching notification details:", error);
    }
  };

  const handleUpdateNotificationStatus = async (id, status) => {
    setLoadingIds((prev) => ({ ...prev, [id]: true }));

    try {
      await axios.put(`http://localhost:5000/api/admin/notifications/${id}`, { status });

      // Remove the approved/rejected notification from the UI
      setNotifications((prev) => prev.filter((notification) => notification._id !== id));
      alert(`Notification ${status} successfully!`);
    } catch (error) {
      console.error("Error updating notification status:", error);
      alert("Failed to update notification status.");
    } finally {
      setLoadingIds((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="admin-notifications">
      <h2>Notifications</h2>

      {notifications.length === 0 ? (
        <p className="no-notifications">No notifications available.</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification._id} className="notification-item">
              <img
                src={notification.profileImage || "https://via.placeholder.com/40"}
                alt="User"
              />
              <div className="notification-text">
                <p className="username">{notification.username}</p>
                <p className="message" onClick={() => handleNotificationClick(notification._id)}>
                  is requesting verification
                </p>
              </div>
              {!notification.read && <div className="unread-indicator"></div>}
              <div className="btn-group">
                <button
                  onClick={() => handleUpdateNotificationStatus(notification._id, "approved")}
                  disabled={loadingIds[notification._id]}
                  className="approve-btn"
                >
                  {loadingIds[notification._id] ? "Approving..." : "Approve"}
                </button>
                <button
                  onClick={() => handleUpdateNotificationStatus(notification._id, "rejected")}
                  disabled={loadingIds[notification._id]}
                  className="reject-btn"
                >
                  {loadingIds[notification._id] ? "Rejecting..." : "Reject"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Moved selected notification details outside the list */}
      {selectedNotification && (
        <div className="notification-details">
          <h3>Verification Details</h3>
          <p>
            <strong>Document Number:</strong> {selectedNotification.documentNumber || "N/A"}
          </p>
          <p>
            <strong>Issue Date:</strong> {selectedNotification.issueDate || "N/A"}
          </p>
          <p>
            <strong>Issued From:</strong> {selectedNotification.issuedFrom || "N/A"}
          </p>
          {selectedNotification.citizenshipImage ? (
            <img
              src={selectedNotification.citizenshipImage}
              alt="Citizenship"
              style={{ width: "200px", height: "auto" }}
            />
          ) : (
            <p>No image available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminNotifications;
