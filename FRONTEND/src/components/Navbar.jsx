import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUsers, FaChartBar, FaCog, FaBell, FaPowerOff, FaClipboardList, FaMoneyBillWave } from "react-icons/fa";
import "./navbar.css";
import AdminNotification from '../components/AdminNotification'; // Import the AdminNotifications component
import { toast } from "react-toastify";
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
 
  // const handleLogout = () => {
  //   if (window.confirm("Are you sure you want to log out?")) {
  //     localStorage.removeItem("auth-token");
  //     localStorage.removeItem("user-role");
  //     setIsAuthenticated(false);
  //     setIsAdmin(false);
  //     navigate("/login");
  //   }
  // };
  // Custom logout confirmation using Toastify
  const handleLogout = () => {
    toast(
      ({ closeToast }) => (
        <div style={{ padding: "10px" }}>
          <p style={{ marginBottom: "10px" }}>Are you sure you want to log out?</p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              onClick={() => {
                // Logout actions
                localStorage.removeItem("auth-token");
                localStorage.removeItem("user-role");
                setIsAuthenticated(false);
                setIsAdmin(false);
                navigate("/login");
                toast.success("Logged out successfully");
                closeToast();
              }}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                marginRight: "10px",
                cursor: "pointer",
              }}
            >
              Yes
            </button>
            <button
              onClick={closeToast}
              style={{
                background: "gray",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              No
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
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


