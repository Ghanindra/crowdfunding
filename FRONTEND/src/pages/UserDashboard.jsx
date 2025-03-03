

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import './userdashboard.css';

// const UserDashboard = () => {
//   const [campaigns, setCampaigns] = useState([]);
//   const [totalDonation, setTotalDonation] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [userId, setUserId] = useState(null);
//   useEffect(() => {
//     //  Retrieve userId from localStorage
//     const storedUserId = localStorage.getItem("user-id");
//     if (storedUserId) {
//       setUserId(storedUserId);
//     } else {
//       console.error(" userId not found in localStorage");
//     }
//   }, []);
//   useEffect(() => {
//     console.log("userId in UserDashboard:", userId); // Debugging log

//     if (userId) {
//       fetchCampaigns();
//       fetchDonations();
//       setLoading(false);
//     }
//   }, [userId]);

//   const fetchCampaigns = async () => {
//     try {
//       if (!userId) {
//         console.error("fetchCampaigns: userId is undefined");
//         return;
//       }
//       const res = await axios.get(`http://localhost:5000/api/user-dashboard/campaigns/${userId}`);
//       setCampaigns(res.data.campaigns);
//       console.log('user campaign',res.data.campaigns);
      
//     } catch (error) {
//       console.error("Error fetching campaigns:", error);
//     }
//   };

//   const fetchDonations = async () => {
//     try {
//       if (!userId) {
//         console.error("fetchDonations: userId is undefined");
//         return;
//       }
//       const res = await axios.get(`http://localhost:5000/api/user-dashboard/donations/${userId}`);
//       setTotalDonation(res.data.totalDonation);
//       console.log("Total Donations:", res.data.totalDonation);
//     } catch (error) {
//       console.error("Error fetching donations:", error);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="dashboard-container">
//       <h1>User Dashboard</h1>
//       <div className="total-donations">
//         <h2>Total Donations to Other Campaigns: ${totalDonation}</h2>
//       </div>
//       <div className="user-campaigns">
//         <h2>Your Campaigns</h2>
//         {campaigns.length === 0 ? (
//           <p>You haven't created any campaigns yet.</p>
//         ) : (
//           <ul>
//             {campaigns.map((campaign) => (
//               <li key={campaign._id} className="campaign-card">
//                 <h3>{campaign.title}</h3>
//                 <p>{campaign.description}</p>
//                 <p>Location: {campaign.placeName}</p>
//                 <p>Target Amount: ${campaign.totalAmount}</p>
//                 <p>Raised Amount: ${campaign.raisedAmount}</p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;
import React, { useEffect, useState } from "react";
import axios from "axios";
import './userdashboard.css';
import { useNavigate } from "react-router-dom";
const UserDashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [totalDonation, setTotalDonation] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate(); // Hook for navigation
  useEffect(() => {
    //  Retrieve userId from localStorage
    const storedUserId = localStorage.getItem("user-id");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.error(" userId not found in localStorage");
    }
  }, []);

  useEffect(() => {
    console.log("userId in UserDashboard:", userId); // Debugging log

    if (userId) {
      fetchCampaigns();
      fetchDonations();
      setLoading(false);
    }
  }, [userId]);

  const fetchCampaigns = async () => {
    try {
      if (!userId) {
        console.error("fetchCampaigns: userId is undefined");
        return;
      }
      const res = await axios.get(`http://localhost:5000/api/user-dashboard/campaigns/${userId}`);
      setCampaigns(res.data.campaigns);
      console.log('user campaign',res.data.campaigns);
      
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  const fetchDonations = async () => {
    try {
      if (!userId) {
        console.error("fetchDonations: userId is undefined");
        return;
      }
      const res = await axios.get(`http://localhost:5000/api/user-dashboard/donations/${userId}`);
      setTotalDonation(res.data.totalDonation);
      console.log("Total Donations:", res.data.totalDonation);
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1 className='userdashboardh1'>User Dashboard</h1>

      <div className="total-donations">
        <h2>Total Donations to Other Campaigns: ${totalDonation}</h2>
      </div>
      <div className="user-campaigns">
        <h2>Your Campaigns</h2>
        {campaigns.length === 0 ? (
          <p>You haven't created any campaigns yet.</p>
        ) : (
          <div className="campaigns-grid">
            {campaigns.map((campaign) => (
              <div key={campaign._id} className="campaign-card">
                <h3>Title:{campaign.title}</h3>
                <p>Description:{campaign.description}</p>
                <p>Location: {campaign.placeName}</p>
                <img src={`http://localhost:5000/${campaign.image}`} alt={campaign.title} className="userdshboard-fundraiser-image" />
                <p>Target Amount: ${campaign.targetAmount}</p>
                <p>Raised Amount: ${campaign.raisedAmount}</p>
              </div>
            ))}
          </div>
          
        )}
        
      </div>
      <button className="back-button" onClick={() => navigate(-1)}>⬅ Back</button>
    </div>
    
  );

};

export default UserDashboard;
