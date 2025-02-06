
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
import CampaignCreator from './pages/CampaignCreator'
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home'
import VerifyAccount from './pages/VerifyAccount'
import ProtectedRoute from './components/ProtectedRoute';
import AdminNotification from './components/AdminNotification';
import Category from './pages/Category';

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
              </ProtectedRoute>} /> 
        <Route path="/creatordashboard" element={ <ProtectedRoute alllowed='restricted'>
                <CreatorDashboard />
              </ProtectedRoute>} />
        <Route path="/fundraiser" element={ <ProtectedRoute alllowed='restricted'>
                <Fundraiser />
              </ProtectedRoute>} />
        <Route path="category/cause" element={ <ProtectedRoute alllowed='restricted'>
                <Cause />
              </ProtectedRoute>} /> 
        <Route path="category/education" element={ <ProtectedRoute alllowed='restricted'>
                <Education />
              </ProtectedRoute>} /> 
        <Route path="category/medical" element={ <ProtectedRoute alllowed='restricted'>
                <Medical/>
              </ProtectedRoute>} /> 
        <Route path="category/animal" element={ <ProtectedRoute alllowed='restricted'>
                <Animal />
              </ProtectedRoute>} /> 
        <Route path="category/emergency" element={ <ProtectedRoute alllowed='restricted'>
                <Emergency />
              </ProtectedRoute>} /> 
        <Route path="category/business" element={ <ProtectedRoute alllowed='restricted'>
                <Business />
              </ProtectedRoute>} /> 
        <Route path="/donordashboard" element={  <ProtectedRoute>
                <DonorDashboard />
              </ProtectedRoute>} /> 
        <Route path="/forgot" element={<Forgot />} /> 
        <Route path="/verify" element={<Verify />} /> 
        <Route path="/profile" element={<ProtectedRoute>
                <Profile />
              </ProtectedRoute>} />
        <Route path="/campaignCreator" element={<ProtectedRoute>
                <CampaignCreator />
              </ProtectedRoute>} /> 
        <Route path="admin/notifications" element={<ProtectedRoute>
                <AdminNotification />
              </ProtectedRoute>} /> 
              <Route path="/verify_account" element={<ProtectedRoute>
                <VerifyAccount />
              </ProtectedRoute>} /> 
      </Routes>
       
      <Routes>
          <Route path="donate/:category" element={<Category />} />
        </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
