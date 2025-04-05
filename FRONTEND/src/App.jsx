
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
              <Route path="/contact" element={<ProtectedRoute>     
                <Contact />
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
              <Route path="admin/notifications/:id" element={<ProtectedRoute>
                <NotificationDetails />
              </ProtectedRoute>} />

              <Route path="/verify_account" element={<ProtectedRoute>
                <VerifyAccount />
              </ProtectedRoute>} /> 
              <Route path="/start" element={<ProtectedRoute>
                <Start />
              </ProtectedRoute>} /> 
              <Route path="/fundraiser/animal" element={<ProtectedRoute>
                <FundAnimal />
              </ProtectedRoute>} /> 
              <Route path="/fundraiser/business" element={<ProtectedRoute>
                <FundBusiness />
              </ProtectedRoute>} /> 
              <Route path="/fundraiser/emergency" element={<ProtectedRoute>
                <FundEmergency />
              </ProtectedRoute>} /> 
              <Route path="/fundraiser/education" element={<ProtectedRoute>
                <FundEducation />
              </ProtectedRoute>} /> 
              <Route path="/fundraiser/medical" element={<ProtectedRoute>
                <FundMedical />
              </ProtectedRoute>} /> 
              <Route path="/donationpage" element={<ProtectedRoute>
                <DonationPage />
              </ProtectedRoute>} /> 
              <Route path="/donationpage/payment" element={<ProtectedRoute>
                <Paymentpage />
              </ProtectedRoute>} /> 
              <Route path="/success" element={<ProtectedRoute>
                <Success/>
              </ProtectedRoute>} /> 
              <Route path="/failure" element={<ProtectedRoute>
                <Failure/>
              </ProtectedRoute>} /> 
              {/* <Route path="/donationpage/:campaignId" component={DonationPage} /> */}

              <Route path="/search" element={<ProtectedRoute>
                <SearchResults/>
              </ProtectedRoute>} /> 
              <Route path="/usernotification" element={<ProtectedRoute>
                <UserNotification/>
  
              </ProtectedRoute>} /> 
              <Route path="/userdashboard" element={<ProtectedRoute>
                <UserDashboard/>
  
              </ProtectedRoute>} /> 
              <Route path="/admin/campaigns" element={<ProtectedRoute>
                <ManageCampaign />
              </ProtectedRoute>} /> 
      </Routes>
      {/* <Route path="admin/campaign" element={ <ProtectedRoute alllowed='restricted'> */}
                {/* <ManageCampaign /> */}
              {/* </ProtectedRoute>} />  */}
      <Routes>
          <Route path="donate/:category" element={<Category />} />
        </Routes>
      
        <Routes>
        <Route path="/admin/reports/:reportId" element={<ReportDetails />} />

        </Routes>
        <Routes>
        <Route path="/admin/reports" element={<Report />} />

        </Routes>
        <Routes>
        <Route path="/admin/contact/:contactId" element={<AdminContact />} />

        </Routes>
       
        <Routes>
        <Route path="/admin/campaigns/:id" element={<CampaignDetails />} />
        </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
