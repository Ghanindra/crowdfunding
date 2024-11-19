
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
import Auth from './pages/Auth';
import AdminDashboard from './components/AdminDashboard'; // Example of a protected route
import DonorDashboard from './components/DonorDashboard'; // Example of a protected route
import CreatorDashboard from './components/CreatorDashboard'; // Example of a protected route
import Forgot from './pages/Forgot'
// import Navbar from './components/Navbar'
import Verify from './pages/Verify'
import Cause from './pages/Cause'
import Animal from './pages/Animal'
import Medical from './pages/Medical'
import Emergency from './pages/Emergency'
import Business from './pages/Business'
import Education from './pages/Education'
import Profile from './pages/Profile'
import Restriction from './pages/Restriction'
import Fundraiser from './pages/Fundraiser'
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute';
// import ResetPassword from './pages/ResetPassword'
function App() {
  return (
    <AuthProvider> 
    <Router>
      <Routes>
      <Route path="/" element={<Home />} /> {/* Root will display the Auth component */}
        <Route path="/login" element={<Auth />} /> {/* Root will display the Auth component */}
        <Route path="/restriction" element={<Restriction allowed='restricted' />} /> {/* Root will display the Auth component */}
       
        {/* <Route path="/dashboard" element={<AdminDashboard />} /> Protected route after login */}
        <Route path="/admindashboard" element={<ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>} /> {/* Protected route after login */}
        <Route path="/creatordashboard" element={ <ProtectedRoute alllowed='restricted'>
                <CreatorDashboard />
              </ProtectedRoute>} /> {/* Protected route after login */}
        <Route path="/fundraiser" element={ <ProtectedRoute alllowed='restricted'>
                <Fundraiser />
              </ProtectedRoute>} /> {/* Protected route after login */}
        <Route path="/cause" element={ <ProtectedRoute alllowed='restricted'>
                <Cause />
              </ProtectedRoute>} /> {/* Protected route after login */}
        <Route path="/education" element={ <ProtectedRoute alllowed='restricted'>
                <Education />
              </ProtectedRoute>} /> {/* Protected route after login */}
        <Route path="/medical" element={ <ProtectedRoute alllowed='restricted'>
                <Medical/>
              </ProtectedRoute>} /> {/* Protected route after login */}
        <Route path="/animal" element={ <ProtectedRoute alllowed='restricted'>
                <Animal />
              </ProtectedRoute>} /> {/* Protected route after login */}
        <Route path="/emergency" element={ <ProtectedRoute alllowed='restricted'>
                <Emergency />
              </ProtectedRoute>} /> {/* Protected route after login */}
        <Route path="/business" element={ <ProtectedRoute alllowed='restricted'>
                <Business />
              </ProtectedRoute>} /> {/* Protected route after login */}
        <Route path="/donordashboard" element={  <ProtectedRoute>
                <DonorDashboard />
              </ProtectedRoute>} /> {/* Protected route after login */}
        <Route path="/forgot" element={<Forgot />} /> {/* Protected route after login */}
        <Route path="/verify" element={<Verify />} /> {/* Protected route after login */}
        <Route path="/profile" element={<ProtectedRoute>
                <Profile />
              </ProtectedRoute>} /> {/* Protected route after login */}
        {/* <Route path="/resetPassword" element={<ResetPassword />} /> Protected route after login */}
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
