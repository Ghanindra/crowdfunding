
// import React from 'react';
// import { Link } from 'react-router-dom';
// import './navbar.css';

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <div className="navbar-brand">
//         <h1>CROWDFUNDING</h1>
//       </div>
//       <ul className="navbar-links">
//         <li><Link to="/explore">Explore Projects</Link></li>
        
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

//         <li><Link to="/start-campaign">Start a Campaign</Link></li>
//         <li><Link to="/my-donations">My Donations</Link></li>
//         <li><Link to="/campaign-guidelines">Campaign Guidelines</Link></li>
//         <li><Link to="/about">About Us</Link></li>
//         <li><Link to="/contact">Contact</Link></li>
//       </ul>
//       <div className="navbar-auth">
//         {localStorage.getItem('auth-token') ? (
//           <>
//             <Link to="/profile">
//               <button>Profile</button>
//             </Link>
//             <button
//               onClick={() => {
//                 localStorage.removeItem('auth-token');
//                 alert('Logged out successfully!');
//                 window.location.replace('/');
//               }}
//             >
//               Logout
//             </button>
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

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to the search results page with the query as a URL parameter
      window.location.href = `/search?query=${searchQuery}`;
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>CROWDFUNDING</h1>
      </div>
      <ul className="navbar-links">
        {/* Search Feature */}
        <li className="navbar-search">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="navbar-search-input"
            />
            <button type="submit" className="navbar-search-button">
              Search
            </button>
          </form>
        </li>

        {/* Donation Dropdown Menu */}
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

        <li><Link to="/start-campaign">Start a Campaign</Link></li>
        <li><Link to="/my-donations">My Donations</Link></li>
        <li><Link to="/campaign-guidelines">Campaign Guidelines</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      <div className="navbar-auth">
        {localStorage.getItem('auth-token') ? (
          <>
            <Link to="/profile">
              <button>Profile</button>
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem('auth-token');
                alert('Logged out successfully!');
                window.location.replace('/');
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
