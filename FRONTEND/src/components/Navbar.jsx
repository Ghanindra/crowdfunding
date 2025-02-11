// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import './navbar.css';
// import {toast} from 'react-toastify'
// const Navbar = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false); // New state to track admin status
//   const [searchQuery, setSearchQuery] = useState("");
//   const [notifications, setNotifications] = useState(1); // Example: Number of unread notifications

// useEffect(() => {
//   // Check for an auth-token in localStorage to determine if the user is authenticated
//   setIsAuthenticated(!!localStorage.getItem('auth-token'));
 
//   // Retrieve user role from localStorage
//   const userRole = localStorage.getItem('user-role');
//   console.log("admin:",userRole);
  
//   setIsAdmin(userRole === 'admin'); // Set admin status based on role

// }, []);
// useEffect(() => {
//   const fetchNotifications = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/notifications/count');
//       setNotifications(response.data.count);
//     } catch (error) {
//       console.error('Error fetching notification count:', error);
//     }
//   };

//   fetchNotifications();
// }, []);
// const markNotificationsAsRead = async () => {
//   try {
//     await axios.put('http://localhost:5000/api/notifications/mark-as-read');
//     setNotifications(0); // Reset the count locally
//   } catch (error) {
//     console.error('Error marking notifications as read:', error);
//   }
// };

// const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       window.location.href = `/search?query=${searchQuery}`;
//     }
//   };
//   const notifyLogout = () => toast.success('You have logged out successfully!');
//   const handleLogout = () => {

//     const isConfirmed = window.confirm('Are you sure you want to log out?');
    

//     if (isConfirmed) {
//       // Show toast notification
//       notifyLogout();
//       localStorage.removeItem('auth-token');
//       localStorage.removeItem('user-role'); // Clear stored role
//       setIsAuthenticated(false);
//       setIsAdmin(false);
     
//      // Redirect after a short delay to allow the toast to be visible
//      setTimeout(() => {
//       window.location.replace('/');
//     }, 1500); // Delay of 1.5 seconds
//   }
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-brand">
//         <h1>CROWDFUNDING</h1>
//       </div>
//       <ul className="navbar-links">
//         <li className="navbar-search">
//           <form onSubmit={handleSearch}>
//             <input
//               type="text"
//               placeholder="Search projects..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="navbar-search-input"
//             />
//             <button type="submit" className="navbar-search-button">
//               Search
//             </button>
//           </form>
//         </li>

//         {/* Donation Dropdown Menu */}
//         <li className="navbar-dropdown">
//           <Link to="/donate">
//             Donate <span className="dropdown-icon">▼</span>
//           </Link>
//           <ul className="dropdown-menu">
//             <li><Link to="/donate/social-impact">Social Impact</Link></li>
//             <li><Link to="/donate/categories">Categories</Link></li>
//             <li><Link to="/donate">How to Donate</Link></li>
//           </ul>
//         </li>

//         <li><Link to="/campaignCreator">Start a Campaign</Link></li>
//         <li><Link to="/campaign-guidelines">Campaign Guidelines</Link></li>
//         <li><Link to="/about">About Us</Link></li>
//         <li><Link to="/contact">Contact</Link></li>
//       </ul>
//       <div className="navbar-auth">
//         {isAuthenticated ? (
//           <>
//             {/* Notification Icon - Visible only for Admins */}
//             {isAdmin && (
//               <div className="navbar-notifications"onClick={markNotificationsAsRead}>
//                 <Link to="/notifications">
//                   <span className="notification-icon">🔔</span>
//                   {notifications > 0 && (
//                     <span className="notification-badge">{notifications}</span>
//                   )}
//                 </Link>
//               </div>
//             )}
//             <Link to="/profile">
//               <button>Profile</button>
//             </Link>
//             <button onClick={handleLogout}>Logout</button>
//           </>
//         ) : (
//           <Link to="/login">
//             <button>Login</button>
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaUsers, FaChartBar, FaCog, FaBell, FaPowerOff, FaClipboardList, FaMoneyBillWave } from "react-icons/fa";
// import "./navbar.css";

// const Navbar = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [notifications, setNotifications] = useState(0);
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check authentication & role
//     const token = localStorage.getItem("auth-token");
//     const userRole = localStorage.getItem("user-role");
// console.log('bibash',userRole);

//     // If token exists, user is authenticated
//     setIsAuthenticated(!!token);
//     // If user-role is 'admin', they are an admin
//     setIsAdmin(userRole === "admin");
//   }, []);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/notifications/count");
//         setNotifications(response.data.count);
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//       }
//     };
//     fetchNotifications();
//   }, []);

//   const handleLogout = () => {
//     if (window.confirm("Are you sure you want to log out?")) {
//       localStorage.removeItem("auth-token");
//       localStorage.removeItem("user-role");
//       setIsAuthenticated(false);
//       setIsAdmin(false);
//       navigate("/login");
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/search?query=${searchQuery}`);
//     }
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-brand">
//         <Link to={isAdmin ? "/admin/dashboard" : "/"} className="navbar-logo">
//           🚀 CROWDFUNDING
//         </Link>
//       </div>

//       <ul className="navbar-links">
//         {/* Search bar (common for both users and admins) */}
//         <li className="navbar-search">
//           <form onSubmit={handleSearch}>
//             <input
//               type="text"
//               placeholder="Search projects..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="navbar-search-input"
//             />
//             <button type="submit" className="navbar-search-button">Search</button>
//           </form>
//         </li>

//         {isAdmin ? (
//           // Admin Navbar
//           <>
//             <li><Link to="/admin/dashboard"><FaChartBar /> Dashboard</Link></li>
//             <li><Link to="/admin/campaigns"><FaClipboardList /> Manage Campaigns</Link></li>
//             <li><Link to="/admin/users"><FaUsers /> User Management</Link></li>
//             <li><Link to="/admin/transactions"><FaMoneyBillWave /> Transactions</Link></li>
//             <li><Link to="/admin/reports"><FaChartBar /> Reports</Link></li>
//             <li><Link to="/admin/settings"><FaCog /> Settings</Link></li>
//             <li className="navbar-notifications">
//               <Link to="/admin/notifications">
//                 <FaBell />
//                 {notifications > 0 && <span className="notification-badge">{notifications}</span>}
//               </Link>
//             </li>
//           </>
//         ) : (
//           // User Navbar
//           <>
//        <li className="navbar-dropdown">
//         <Link to="/donate">
//            Donate <span className="dropdown-icon">▼</span>
//        </Link>
//         <ul className="dropdown-menu">
//           <li><Link to="/donate/social-impact">Social Impact</Link></li>
//            <li><Link to="/donate/categories">Categories</Link></li>
//            <li><Link to="/donate">How to Donate</Link></li>
//          </ul>
//        </li>
//             <li><Link to="/campaignCreator">Start a Campaign</Link></li>
//             <li><Link to="/campaign-guidelines">Campaign Guidelines</Link></li>
//             <li><Link to="/about">About Us</Link></li>
//             <li><Link to="/contact">Contact</Link></li>
//           </>
//         )}
//       </ul>

//       {/* Auth Buttons */}
//       <div className="navbar-auth">
//         {isAuthenticated ? (
//           <>
//             <Link to="/profile"><button>Profile</button></Link>
//             <button className="logout-button" onClick={handleLogout}>
//               <FaPowerOff /> Logout
//             </button>
//           </>
//         ) : (
//           <Link to="/login"><button>Login</button></Link>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaUsers, FaChartBar, FaCog, FaBell, FaPowerOff, FaClipboardList, FaMoneyBillWave } from "react-icons/fa";
// import "./navbar.css";

// const Navbar = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [notifications, setNotifications] = useState(0);
//   const [notificationList, setNotificationList] = useState([]);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check authentication & role
//     const token = localStorage.getItem("auth-token");
//     const userRole = localStorage.getItem("user-role");

//     // If token exists, user is authenticated
//     setIsAuthenticated(!!token);
//     // If user-role is 'admin', they are an admin
//     setIsAdmin(userRole === "admin");
//   }, []);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/notifications/count");
//         setNotifications(response.data.count);
        
//         // Fetch notification details
//         const notifResponse = await axios.get("http://localhost:5000/api/notifications/:id");
//         setNotificationList(notifResponse.data);
//         console.log(notifResponse.data)
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//       }
//     };
//     fetchNotifications();
//   }, []);

//   const handleLogout = () => {
//     if (window.confirm("Are you sure you want to log out?")) {
//       localStorage.removeItem("auth-token");
//       localStorage.removeItem("user-role");
//       setIsAuthenticated(false);
//       setIsAdmin(false);
//       navigate("/login");
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/search?query=${searchQuery}`);
//     }
//   };

//   const toggleDropdown = () => {
//     setIsDropdownOpen((prev) => !prev);
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-brand">
//         <Link to={isAdmin ? "/admin/dashboard" : "/"} className="navbar-logo">
//           🚀 CROWDFUNDING
//         </Link>
//       </div>

//       <ul className="navbar-links">
//         {/* Search bar (common for both users and admins) */}
//         <li className="navbar-search">
//           <form onSubmit={handleSearch}>
//             <input
//               type="text"
//               placeholder="Search projects..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="navbar-search-input"
//             />
//             <button type="submit" className="navbar-search-button">Search</button>
//           </form>
//         </li>

//         {isAdmin ? (
//           // Admin Navbar
//           <>
//             <li><Link to="/admin/dashboard"><FaChartBar /> Dashboard</Link></li>
//             <li><Link to="/admin/campaigns"><FaClipboardList /> Manage Campaigns</Link></li>
//             <li><Link to="/admin/users"><FaUsers /> User Management</Link></li>
//             <li><Link to="/admin/transactions"><FaMoneyBillWave /> Transactions</Link></li>
//             <li><Link to="/admin/reports"><FaChartBar /> Reports</Link></li>
//             <li><Link to="/admin/settings"><FaCog /> Settings</Link></li>
//             <li className="navbar-notifications">
//               <Link to="/admindashboard" onClick={toggleDropdown}>
//                 <FaBell />
//                 {notifications > 0 && <span className="notification-badge">{notifications}</span>}
//               </Link>
//               {isDropdownOpen && (
//                 <div className="dropdown-menu">
//                   <ul>
//                     {notificationList.map((notification) => (
//                       <li key={notification._id} className="dropdown-item">
//                         <p className="notification-message">
//                           {notification.username} is requesting verification
//                         </p>
//                         <button className="mark-read-btn">Mark as Read</button>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </li>
//           </>
//         ) : (
//           // User Navbar
//           <>
//             <li className="navbar-dropdown">
//               <Link to="/donate">
//                 Donate <span className="dropdown-icon">▼</span>
//               </Link>
//               <ul className="dropdown-menu">
//                 <li><Link to="/donate/social-impact">Social Impact</Link></li>
//                 <li><Link to="/donate/categories">Categories</Link></li>
//                 <li><Link to="/donate">How to Donate</Link></li>
//               </ul>
//             </li>
//             <li><Link to="/campaignCreator">Start a Campaign</Link></li>
//             <li><Link to="/campaign-guidelines">Campaign Guidelines</Link></li>
//             <li><Link to="/about">About Us</Link></li>
//             <li><Link to="/contact">Contact</Link></li>
//           </>
//         )}
//       </ul>

//       {/* Auth Buttons */}
//       <div className="navbar-auth">
//         {isAuthenticated ? (
//           <>
//             <Link to="/profile"><button>Profile</button></Link>
//             <button className="logout-button" onClick={handleLogout}>
//               <FaPowerOff /> Logout
//             </button>
//           </>
//         ) : (
//           <Link to="/login"><button>Login</button></Link>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUsers, FaChartBar, FaCog, FaBell, FaPowerOff, FaClipboardList, FaMoneyBillWave } from "react-icons/fa";
import "./navbar.css";
import AdminNotification from '../components/AdminNotification'; // Import the AdminNotifications component

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [notifications, setNotifications] = useState(0);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Declare searchQuery state
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication & role
    const token = localStorage.getItem("auth-token");
    const userRole = localStorage.getItem("user-role");

    // If token exists, user is authenticated
    setIsAuthenticated(!!token);
    // If user-role is 'admin', they are an admin
    setIsAdmin(userRole === "admin");
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/notifications/count");
        setNotifications(response.data.count);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);
 
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("auth-token");
      localStorage.removeItem("user-role");
      setIsAuthenticated(false);
      setIsAdmin(false);
      navigate("/login");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to={isAdmin ? "/admin/dashboard" : "/"} className="navbar-logo">
          🚀 CROWDFUNDING
        </Link>
      </div>

      <ul className="navbar-links">
        {/* Search bar (common for both users and admins) */}
        <li className="navbar-search">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="navbar-search-input"
            />
            <button type="submit" className="navbar-search-button">Search</button>
          </form>
        </li>

        {isAdmin ? (
          // Admin Navbar
          <>
            <li><Link to="/admin/dashboard"><FaChartBar /> Dashboard</Link></li>
            <li><Link to="/admin/campaigns"><FaClipboardList /> Manage Campaigns</Link></li>
            <li><Link to="/admin/users"><FaUsers /> User Management</Link></li>
            <li><Link to="/admin/transactions"><FaMoneyBillWave /> Transactions</Link></li>
            <li><Link to="/admin/reports"><FaChartBar /> Reports</Link></li>
            <li><Link to="/admin/settings"><FaCog /> Settings</Link></li>
            <li className="navbar-notifications">
              <div onClick={toggleDropdown}>
              <FaBell style={{ color: 'white' }} />
                {notifications > 0 && <span className="notification-badge">{notifications}</span>}
              </div>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <AdminNotification /> 
                  
                </div>
              )}
            </li>
          </>
        ) : (
          // User Navbar
          <>
            <li className="navbar-dropdown">
              <Link to="/donate">
                Donate <span className="dropdown-icon">▼</span>
              </Link>
              <ul className="dropdown-menu">
                <li><Link to="/donate/social-impact">Social Impact</Link></li>
                <li><Link to="/donate/categories">Categories</Link></li>
                <li><Link to="/donate">How to Donate</Link></li>
              </ul>
            </li>
            <li><Link to="/campaignCreator">Start a Campaign</Link></li>
            <li><Link to="/campaign-guidelines">Campaign Guidelines</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </>
        )}
      </ul>

      {/* Auth Buttons */}
      <div className="navbar-auth">
        {isAuthenticated ? (
          <>
            <Link to="/profile"><button>Profile</button></Link>
            <button className="logout-button" onClick={handleLogout}>
              <FaPowerOff /> Logout
            </button>
          </>
        ) : (
          <Link to="/login"><button>Login</button></Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


