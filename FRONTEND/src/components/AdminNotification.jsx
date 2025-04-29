import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./adminnotification.css";

const AdminNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch notifications on component mount
    fetchNotifications();
  }, []);

  // Fetch all notifications from the backend
  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/admin/notifications");
      const notificationsData = response.data;
      setNotifications(notificationsData);
      setError(""); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setError("Failed to load notifications.");
    } finally {
      setLoading(false);
    }
  };

  // Handle click on a notification and navigate accordingly
  const handleNotificationClick = async (notification) => {
    try {
      console.log("Marking notification as read:", notification._id);
      
      // API call to mark notification as read
      await axios.put(`http://localhost:5000/api/notifications/mark-as-read/${notification._id}`);
      
      // Handle different notification types
      if (notification.type === "verification" || notification.type === "verification_update") {
        const response = await axios.get(`http://localhost:5000/api/admin/notifications/${notification._id}`);
        console.log("Fetched verification notification details:", response.data);
        navigate(`/admin/notifications/${notification._id}`, { state: { notification: response.data } });
      } else if (notification.type === "campaign") {
        const response = await axios.get(`http://localhost:5000/api/campaigns/${notification.campaignId}`);
        console.log("Fetched campaign details:", response.data);
        navigate(`/admin/campaigns/${notification.campaignId}`, { state: { campaign: response.data } });
      } else if (notification.type === "report") {
        if (!notification.reportId) {
          console.error("Report ID is missing.");
          setError("Report ID is missing.");
          return;
        }
        const response = await axios.get(`http://localhost:5000/api/admin/notifications/${notification._id}`);
        console.log("Fetched report details:", response.data);
        navigate(`/admin/reports/${notification.reportId}`, { state: { report: response.data } });
    
      }else if (notification.type === "contact") {
        if (!notification.contactId) {
          console.error("contact ID is missing.");
          setError("contact ID is missing.");
          return;
        }
        const response = await axios.get(`http://localhost:5000/api/admin/notifications/${notification._id}`);
        console.log("Fetched contact details:", response.data);
        navigate(`/admin/contact/${notification.contactId}`, { state: { contact: response.data } });
      }

      // Remove the clicked notification from the list
      setNotifications((prevNotifications) => {
        const updatedNotifications = prevNotifications.filter((notif) => notif._id !== notification._id);
        console.log("Updated Notifications:", updatedNotifications); // Log updated notifications
        return updatedNotifications;
      });

    } catch (error) {
      console.error("Error fetching details:", error);
      setError("Failed to fetch details.");
    }
  };

  return (
    <div className="admin-notifications">
      <h2>Notifications</h2>
      {loading ? (
        <p>Loading notifications...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : notifications.length === 0 ? (
        <p className="no-notifications">No notifications available.</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification._id} className="notification-item">
              {notification.type === "verification" ? (
                <p
                  className="message"
                  onClick={() => handleNotificationClick(notification)}
                >
                  {notification.username} is requesting verification.
                </p>
              ) 
              : notification.type === "campaign" ? (
                <p
                  className="message campaign-message"
                  onClick={() => handleNotificationClick(notification)}
                >
                  New Campaign: {notification.message}
                </p>
              ) : notification.type === "report" ? (
                <p
                  className="message report-message"
                  onClick={() => handleNotificationClick(notification)}
                >
                  {notification.message}
                </p>
              ) :notification.type === "contact" ? (
                <p
                  className="message campaign-message"
                  onClick={() => handleNotificationClick(notification)}
                >
                 {notification.username} is requesting to contact.
                </p>
              ) : (
                <p>Unknown notification type.</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminNotification;
