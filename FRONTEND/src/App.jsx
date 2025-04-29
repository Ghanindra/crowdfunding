
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
import Environment from './pages/Environment'
import Business from './pages/Business'
import Education from './pages/Education'
import Profile from './pages/Profile'
import Restriction from './pages/Restriction'
import Fundraiser from './pages/Fundraiser'
import FundAnimal from './pages/FundAnimal'
import FundEducation from './pages/FundEducation'
import FundEmergency from './pages/FundEmergency'
import FundMedical from './pages/FundMedical'
import FundBusiness from './pages/FundBusiness'
import CampaignCreator from './pages/CampaignCreator'
import DonationPage from './pages/DonationPage'
import Paymentpage from './pages/Paymentpage'

import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home'
import VerifyAccount from './pages/VerifyAccount'
import Start from './pages/Start'
import ProtectedRoute from './components/ProtectedRoute';
import AdminNotification from './components/AdminNotification';
import Category from './pages/Category';
import NotificationDetails from "./components/NotificationDetails";
import Success from "./pages/Success";
import Contact from "./pages/Contact";
import AdminContact from "./pages/AdminContact";
import Failure from "./pages/Failure";
import SearchResults from "./pages/SearchResults";
import UserNotification from "./pages/UserNotification";
import ReportDetails from "./pages/ReportDetails";
import Report from "./pages/Report";
import UserDashboard from "./pages/UserDashboard";
import ManageCampaign from "./pages/ManageCampaign";
import CampaignDetails from "./components/CampaignDetails";
import PaymentHistory from "./pages/PaymentHistory";
import AllPayments from "./pages/AllPayments";
import UserManagement from "./components/UserManagement";
import HowToDonate from './pages/HowToDonate';
import CampaignGuidelines from './pages/CampaignGuidelines';
import AboutUs from './pages/AboutUs';
import "./App.css";

function App() {
  return (


    <AuthProvider> 
      
      <Router>
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Auth />} />
    <Route path="/forgot" element={<Forgot />} />
    <Route path="/verify" element={<Verify />} />
    <Route path="/donate/:category" element={<Category />} />
    <Route path="/how-to-donate" element={<HowToDonate />} />
    <Route path="/campaign-guidelines" element={<CampaignGuidelines />} />
    <Route path="/about-us" element={<AboutUs />} />
    <Route path="/contact" element={<Contact />} />
    
    {/* Admin Routes */}
    <Route path="/admindashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
    <Route path="/admin/notifications" element={<ProtectedRoute><AdminNotification /></ProtectedRoute>} />
    <Route path="/admin/notifications/:id" element={<ProtectedRoute><NotificationDetails /></ProtectedRoute>} />
    <Route path="/admin/reports" element={<ProtectedRoute><Report /></ProtectedRoute>} />
    <Route path="/admin/reports/:reportId" element={<ProtectedRoute><ReportDetails /></ProtectedRoute>} />
    <Route path="/admin/contact/:contactId" element={<ProtectedRoute><AdminContact /></ProtectedRoute>} />
    <Route path="/admin/campaigns" element={<ProtectedRoute><ManageCampaign /></ProtectedRoute>} />
    <Route path="/admin/campaigns/:id" element={<ProtectedRoute><CampaignDetails /></ProtectedRoute>} />
    <Route path="/AllPayments" element={<ProtectedRoute><AllPayments/></ProtectedRoute>} />
    <Route path="/admin/users" element={<ProtectedRoute><UserManagement/></ProtectedRoute>} />

    {/* User Routes */}
    <Route path="/donordashboard" element={<ProtectedRoute><DonorDashboard /></ProtectedRoute>} />
    <Route path="/usernotification" element={<ProtectedRoute><UserNotification /></ProtectedRoute>} />
    <Route path="/userdashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
   
    <Route path="/paymentHistory" element={<ProtectedRoute><PaymentHistory/></ProtectedRoute>} />

    {/* Campaign Creator Routes */}
    <Route path="/creatordashboard" element={<ProtectedRoute><CreatorDashboard /></ProtectedRoute>} />
    <Route path="/fundraiser" element={<ProtectedRoute><Fundraiser /></ProtectedRoute>} />
    <Route path="/campaignCreator" element={<ProtectedRoute><CampaignCreator /></ProtectedRoute>} />
    <Route path="/start" element={<ProtectedRoute><Start /></ProtectedRoute>} />
    
    {/* Fundraiser Categories */}
    <Route path="/fundraiser/animal" element={<ProtectedRoute><FundAnimal /></ProtectedRoute>} />
    <Route path="/fundraiser/business" element={<ProtectedRoute><FundBusiness /></ProtectedRoute>} />
    <Route path="/fundraiser/emergency" element={<ProtectedRoute><FundEmergency /></ProtectedRoute>} />
    <Route path="/fundraiser/education" element={<ProtectedRoute><FundEducation /></ProtectedRoute>} />
    <Route path="/fundraiser/medical" element={<ProtectedRoute><FundMedical /></ProtectedRoute>} />

    {/* Category Pages */}
    <Route path="/category/project" element={<ProtectedRoute><Cause /></ProtectedRoute>} />
    <Route path="/category/education" element={<ProtectedRoute><Education /></ProtectedRoute>} />
    <Route path="/category/medical" element={<ProtectedRoute><Medical /></ProtectedRoute>} />
    <Route path="/category/animal" element={<ProtectedRoute><Animal /></ProtectedRoute>} />
    <Route path="/category/emergency" element={<ProtectedRoute><Emergency /></ProtectedRoute>} />
    <Route path="/category/environment" element={<ProtectedRoute><Environment /></ProtectedRoute>} />
    <Route path="/category/business" element={<ProtectedRoute><Business /></ProtectedRoute>} />

    {/* Donation & Payment */}
    <Route path="/donationpage" element={<ProtectedRoute><DonationPage /></ProtectedRoute>} />
    <Route path="/donationpage/payment" element={<ProtectedRoute><Paymentpage /></ProtectedRoute>} />
    <Route path="/donationpage/:id" element={<DonationPage />} />

    {/* Misc */}
    <Route path="/success" element={<ProtectedRoute><Success /></ProtectedRoute>} />
    <Route path="/failure" element={<ProtectedRoute><Failure /></ProtectedRoute>} />
    <Route path="/search" element={<ProtectedRoute><SearchResults /></ProtectedRoute>} />
    <Route path="/restriction" element={<Restriction allowed="restricted" />} />
    <Route path="/verify_account" element={<ProtectedRoute><VerifyAccount /></ProtectedRoute>} />
  </Routes>
</Router>

    </AuthProvider>
  );
}

export default App;
