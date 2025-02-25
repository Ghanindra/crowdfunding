import React, { useEffect, useState } from "react";
import axios from "axios";

const UserNotification = () => {
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

  return (
    <div className="notification-content">
      <h4>User Notifications</h4>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>{notification.message}</li>
          ))}
        </ul>
      ) : (
        <p>No new notifications</p>
      )}
    </div>
  );
};

export default UserNotification;
