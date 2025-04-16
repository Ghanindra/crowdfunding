// import React, { useState, useEffect, useCallback } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaUsers, FaChartBar, FaCog, FaBell, FaPowerOff, FaClipboardList, FaMoneyBillWave, FaUserCircle } from "react-icons/fa";
// import "./navbar.css";
// import AdminNotification from '../components/AdminNotification'; // Admin notifications
// import UserNotification from '../pages/UserNotification'; // User notifications
// import { toast } from "react-toastify";

// const Navbar = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [notifications, setNotifications] = useState(0);
//   const [userNotifications, setUserNotifications] = useState(0);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
//   const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false);
//   const [profilePicture, setProfilePicture] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const userId = localStorage.getItem("user-id"); // Get the user's ID

//   const navigate = useNavigate();
//   useEffect(() => {
//     const fetchProfilePicture = async () => {
//         if (!userId) return;
//         try {
//             const response = await axios.get(`http://localhost:5000/api/user/profile/${userId}`);
//             console.log('profilepicture',response.data.profilePicture);
            
//             setProfilePicture(`http://localhost:5000/${response.data.profilePicture}`)
          
   
      
            
//         } catch (error) {
//             console.error("Error fetching profile picture:", error);
//         }
//     };

//     fetchProfilePicture();
// }, [userId]);
// useEffect(() => {
//   console.log("Updated profile picture:", profilePicture); // This will log when profilePicture changes
// }, [profilePicture]);
//   useEffect(() => {
//     const token = localStorage.getItem("auth-token");
//     const userRole = localStorage.getItem("user-role");

//     setIsAuthenticated(!!token);
//     setIsAdmin(userRole === "admin");
//   }, []);

//   useEffect(() => {
//     const fetchAdminNotifications = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/notifications/count"); // Admin endpoint
//         console.log('adminnotification',response.data);
        
//         setNotifications(response.data.count);
//       } catch (error) {
//         console.error("Error fetching admin notifications:", error);
//       }
//     };
  
//     const fetchUserNotifications = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/user-notifications/count/${userId}`); // User endpoint
//         console.log('usernotification',response.data);
        
//         setUserNotifications(response.data.count);
//       } catch (error) {
//         console.error("Error fetching user notifications:", error);
//       }
//     };
  
//     if (isAdmin) {
//       fetchAdminNotifications();
//     } else {
//       fetchUserNotifications();
//     }
//   }, [isAdmin, userId]);
  
//   const markNotificationAsRead = async (notificationId) => {
//     try {
//       await axios.put(`http://localhost:5000/api/user-notifications/read/${notificationId}`);
//       setUserNotifications((prev) => prev - 1); // Decrement notification count
//     } catch (error) {
//       console.error("Error marking notification as read:", error);
//     }
//   };
  
//   const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
//   const toggleUserDropdown = (event) => {
//     event.stopPropagation(); // Prevent event from bubbling up
//     setIsUserDropdownOpen((prev) => !prev);
//   };
//   const toggleAvatarDropdown = () => setIsAvatarDropdownOpen((prev) => !prev);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) navigate(`/search?query=${searchQuery}`);
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-brand">
//         <Link to={isAdmin ? "/admin/dashboard" : "/"} className="navbar-logo">
//            CROWDFUNDING
//         </Link>
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
//             <button type="submit" className="navbar-search-button">Search</button>
//           </form>
//         </li>

//         {isAdmin ? (
//           <>
//             <li><Link to="/admin/dashboard"><FaChartBar /> Dashboard</Link></li>
//             <li><Link to="/admin/campaigns"><FaClipboardList /> Manage Campaigns</Link></li>
//             <li><Link to="/admin/users"><FaUsers /> User Management</Link></li>
//             <li><Link to="/admin/transactions"><FaMoneyBillWave /> Transactions</Link></li>
//             <li><Link to="/admin/reports"><FaChartBar /> Reports</Link></li>
//             <li><Link to="/admin/settings"><FaCog /> Settings</Link></li>
            
//             {/* Admin Notifications */}
//             <li className="navbar-notifications">
//               <div onClick={toggleDropdown}>
//                 <FaBell style={{ color: 'white' }} />
//                 {notifications > 0 && <span className="notification-badge">{notifications}</span>}
//               </div>
//               {isDropdownOpen && (
//                 <div className="dropdown-menu">
//                   <AdminNotification />
//                 </div>
//               )}
//             </li>
//           </>
//         ) : (
//           <>
//             <li className="navbar-dropdown">
//               <Link to="/donate">Donate <span className="dropdown-icon">▼</span></Link>
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
            
//             {/* User Notifications */}
//             <li className="navbar-notifications">
//               <div onClick={toggleUserDropdown}>                <FaBell style={{ color: 'white' }} />
//                 {userNotifications > 0 && <span className="notification-badge">{userNotifications}</span>}
//              </div>
//              {isUserDropdownOpen && (
//               <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
//                 <UserNotification notifications={notifications} markAsRead={markNotificationAsRead} /> {/* Passing function here */}
//               </div>            )}
//            </li>
//           </>
//          )}
          
        
        
//       </ul>

//       <div className="navbar-auth">
//         {isAuthenticated ? (
//           <div className="avatar-container" onClick={toggleAvatarDropdown}>
//             {/* <FaUserCircle className="avatar-icon" /> */}
//             {profilePicture ? (
//                             <img src={profilePicture} alt="Profile" className="avatar-image" />
//                         ) : (
//                             <FaUserCircle className="avatar-icon" />
//                         )}
//             {isAvatarDropdownOpen && (
//               <div className="dropdown-menu">
//                 <Link to="/profile">Profile</Link>
//                 {!isAdmin && <Link to="/userdashboard">User Dashboard</Link>}
//                 <button className="logout-button" onClick={() => {
//                   toast.success("Logged out successfully");
//                   localStorage.removeItem("auth-token");
//                   localStorage.removeItem("user-role");
//                   setIsAuthenticated(false);
//                   setIsAdmin(false);
//                   navigate("/");
//                 }}>
//                   <FaPowerOff className='logout'/> Logout
//                 </button>
//               </div>
//             )}
//           </div>
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
import { FaUsers, FaChartBar, FaCog, FaBell, FaPowerOff, FaClipboardList, FaMoneyBillWave, FaUserCircle } from "react-icons/fa";
import "./navbar.css";
import AdminNotification from "../components/AdminNotification";
import UserNotification from "../pages/UserNotification";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [notifications, setNotifications] = useState(0);
  const [userNotifications, setUserNotifications] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const userId = localStorage.getItem("user-id");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfilePicture = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(`http://localhost:5000/api/user/profile/${userId}`);
        setProfilePicture(response.data.profilePicture ? `http://localhost:5000/${response.data.profilePicture}` : null);
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    };

    fetchProfilePicture();
  }, [userId]);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    const userRole = localStorage.getItem("user-role");

    setIsAuthenticated(!!token);
    setIsAdmin(userRole === "admin");
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchNotifications = async () => {
      try {
        if (isAdmin) {
          const response = await axios.get("http://localhost:5000/api/notifications/count");
          setNotifications(response.data.count);
        } else {
          const response = await axios.get(`http://localhost:5000/api/user-notifications/count/${userId}`);
          setUserNotifications(response.data.count);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, [isAuthenticated, isAdmin, userId]);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleUserDropdown = (event) => {
    event.stopPropagation();
    setIsUserDropdownOpen((prev) => !prev);
  };
  const toggleAvatarDropdown = () => setIsAvatarDropdownOpen((prev) => !prev);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/search?query=${searchQuery}`);
  };
  const markNotificationAsRead = async (notificationId) => {
    try {
      await axios.put(`http://localhost:5000/api/user-notifications/read/${notificationId}`);
      setUserNotifications((prev) => prev - 1); // Decrement notification count
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to={isAdmin ? "/admin/dashboard" : "/"} className="navbar-logo">
          CROWDFUNDING
        </Link>
      </div>

      <ul className="navbar-links">
        <li className="navbar-search">
          <form onSubmit={handleSearch}>
            <input type="text" placeholder="Search projects..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="navbar-search-input" />
            <button type="submit" className="navbar-search-button">Search</button>
          </form>
        </li>

        {isAdmin ? (
          <>
            <li><Link to="/admin/dashboard"><FaChartBar /> Dashboard</Link></li>
            <li><Link to="/admin/campaigns"><FaClipboardList /> Manage Campaigns</Link></li>
            <li><Link to="/admin/users"><FaUsers /> User Management</Link></li>
            <li><Link to="/Allpayments"><FaMoneyBillWave /> Transactions</Link></li>
            <li><Link to="/admin/reports"><FaChartBar /> Reports</Link></li>
            <li><Link to="/admin/settings"><FaCog /> Settings</Link></li>
            {isAuthenticated && (
              <li className="navbar-notifications">
                <div onClick={toggleDropdown}>
                  <FaBell style={{ color: 'orange' }} />
                  {notifications > 0 && <span className="notification-badge">{notifications}</span>}
                </div>
                {isDropdownOpen && <div className="dropdown-menu"><AdminNotification /></div>}
              </li>
            )}
          </>
        ) : (
          <>
           <li className="navbar-dropdown">
              <Link >Donate <span className="dropdown-icon">▼</span></Link>
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
            {isAuthenticated && (
              <li className="navbar-notifications">
                <div onClick={toggleUserDropdown}>
                  <FaBell style={{ color: 'orange' }} />
                  {userNotifications > 0 && <span className="notification-badge">{userNotifications}</span>}
                </div>
                {isUserDropdownOpen && (
                  <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                    <UserNotification notifications={userNotifications}markAsRead={markNotificationAsRead} />
                  </div>
                )}
              </li>
            )}
          </>
        )}
      </ul>

      <div className="navbar-auth">
        {isAuthenticated ? (
          <div className="avatar-container" onClick={toggleAvatarDropdown}>
            {profilePicture ? <img src={profilePicture} alt="Profile" className="avatar-image" /> : <FaUserCircle className="avatar-icon" />}
            {isAvatarDropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/profile">Profile</Link>
                {!isAdmin && <Link to="/userdashboard">User Dashboard</Link>}
                <button className="logout-button" onClick={() => {
                  toast.success("Logged out successfully");
                  localStorage.clear();
                  setIsAuthenticated(false);
                  setIsAdmin(false);
                  navigate("/");
                }}>
                  <FaPowerOff className='logout'/> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login"><button>Login</button></Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
