import React, { useEffect, useState } from "react";
import axios from "axios";

const UserNotification = ({ markAsRead }) => { // Receive the markAsRead function as a prop
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("user-id"); // Check if this exists
    if (!userId) {
      console.error("User ID is missing in localStorage");
      return;
    }

    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user-notifications/${userId}`);
        console.log("User notifications:", response.data);
        setNotifications(response.data.notifications || []);
      } catch (error) {
        console.error("Error fetching user notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  // Mark the notification as read
  const handleMarkAsRead = async (notificationId) => {
    try {
      await markAsRead(notificationId); // Call the function passed from the parent component
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      ); // Update the state to reflect the notification as read
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <div className="notification-content">
      <h4>User Notifications</h4>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notification) => (
            <li
              key={notification._id}
              onClick={() => handleMarkAsRead(notification._id)} // Mark as read when clicked
              style={{ cursor: "pointer", textDecoration: notification.read ? "line-through" : "none" }}
            >
              {notification.message}
            </li>
          ))}
        </ul>
      ) : (
        <p>No new notifications</p>
      )}
    </div>
  );
};

export default UserNotification;
