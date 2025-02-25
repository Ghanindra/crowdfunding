// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import io from "socket.io-client";
// import { useNavigate } from "react-router-dom";
// import "./adminnotification.css";

// const socket = io("http://localhost:5000"); // Adjust backend URL

// const AdminNotifications = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(false); // Add a loading state
//   const [error, setError] = useState(""); // Add an error state
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchNotifications();

//     socket.on("new_verification", (newNotification) => {
//       console.log("Received new notification:", newNotification);
//       setNotifications((prev) => [newNotification, ...prev]);
//     });

//     return () => socket.off("new_verification");
//   }, []);

//   // Fetch all notifications initially
//   const fetchNotifications = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("http://localhost:5000/api/admin/notifications");
//       setNotifications(response.data);
//       setError(""); // Clear any previous errors
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//       setError("Failed to load notifications.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle click on a specific notification to navigate to its details
//   const handleNotificationClick = async (id) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/admin/notifications/${id}`);
//       console.log("Fetched notification details:", response.data);
//       navigate(`/admin/notifications/${id}`, { state: { notification: response.data } });
//     } catch (error) {
//       console.error("Error fetching notification details:", error);
//       setError("Failed to fetch notification details.");
//     }
//   };

//   return (
//     <div className="admin-notifications">
//       <h2>Notifications</h2>
//       {loading ? (
//         <p>Loading notifications...</p>
//       ) : error ? (
//         <p className="error-message">{error}</p>
//       ) : notifications.length === 0 ? (
//         <p className="no-notifications">No notifications available.</p>
//       ) : (
//         <ul>
//           {notifications.map((notification) => (
//             <li key={notification._id} className="notification-item">
//               <p
//                 className="message"
//                 onClick={() => handleNotificationClick(notification._id)}
//               >
//                 {notification.username} is requesting verification
//               </p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default AdminNotifications;




import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import "./adminnotification.css";

const socket = io("http://localhost:5000"); // Adjust backend URL

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false); // Add a loading state
  const [error, setError] = useState(""); // Add an error state
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();

    socket.on("new_verification", (newNotification) => {
      console.log("Received new notification:", newNotification);
      setNotifications((prev) => [newNotification, ...prev]);
    });

    return () => socket.off("new_verification");
  }, []);

  // Fetch all notifications initially
  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/admin/notifications");
      setNotifications(response.data);
      setError(""); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setError("Failed to load notifications.");
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationClick = async (notification) => {
    try {
      console.log("Marking notification as read:", notification._id);
       // API call to mark the specific notification as read
    const response= await axios.put(`http://localhost:5000/api/notifications/mark-as-read/${notification._id}`);
    console.log("Mark as read response:", response.data); // Debugging
      if (notification.type === "verification") {
        // Fetch verification details
        const response = await axios.get(`http://localhost:5000/api/admin/notifications/${notification._id}`);
        console.log("Fetched notification details:", response.data);
        navigate(`/admin/notifications/${notification._id}`, { state: { notification: response.data } });
      } else if (notification.type === "verification_update") {
        // Step 3: Handle the verification update notification (user modified account)
        const response = await axios.get(`http://localhost:5000/api/admin/notifications`);
        console.log("Fetched updated verification details:", response.data);
  
        // Navigate to the updated verification details page
        navigate(`/admin/notifications/${notification._id}`, { state: { notification: response.data } });
      } 
      else if (notification.type === "campaign") {
        console.log("Campaign ID:", notification.campaignId);
        // Fetch campaign details
        const response = await axios.get(`http://localhost:5000/api/campaigns/${notification.campaignId}`);
        

        console.log("Fetched campaign details:", response.data);
        navigate(`/admin/campaigns/${notification.campaignId}`, { state: { campaign: response.data } });
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
            ) : (
              <p
                className="message campaign-message"
                onClick={() => handleNotificationClick(notification)}
              >
                New Campaign: {notification.message}
              </p>
            )}
          </li>
        ))}
      </ul>
      
      )}
    </div>
  );
};

export default AdminNotifications;
