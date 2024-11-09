
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Signup from './components/Signup';
// import Login from './components/Login';


// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
       
//         {/* Add other routes here */}
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import AdminDashboard from './components/AdminDashboard'; // Example of a protected route
import DonorDashboard from './components/DonorDashboard'; // Example of a protected route
import CreatorDashboard from './components/CreatorDashboard'; // Example of a protected route
import Forgot from './pages/Forgot'
import Navbar from './components/Navbar'
import Verify from './pages/Verify'
import Profile from './pages/Profile'
import { AuthProvider } from './context/AuthContext';

// import ResetPassword from './pages/ResetPassword'
function App() {
  return (
    <AuthProvider> 
    <Router>
      <Routes>
      <Route path="/" element={<Navbar />} /> {/* Root will display the Auth component */}
        <Route path="/login" element={<Auth />} /> {/* Root will display the Auth component */}
       
        {/* <Route path="/dashboard" element={<AdminDashboard />} /> Protected route after login */}
        <Route path="/admindashboard" element={<AdminDashboard />} /> {/* Protected route after login */}
        <Route path="/creatordashboard" element={<CreatorDashboard />} /> {/* Protected route after login */}
        <Route path="/donordashboard" element={<DonorDashboard />} /> {/* Protected route after login */}
        <Route path="/forgot" element={<Forgot />} /> {/* Protected route after login */}
        <Route path="/verify" element={<Verify />} /> {/* Protected route after login */}
        <Route path="/profile" element={<Profile />} /> {/* Protected route after login */}
        {/* <Route path="/resetPassword" element={<ResetPassword />} /> Protected route after login */}
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
