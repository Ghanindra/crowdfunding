import React, { useEffect, useState } from "react";
import axios from "axios";
import  './userdashboard.css'
const UserDashboard = ({ userId }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [totalDonation, setTotalDonation] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch user's campaigns and total raised amount
  const fetchCampaigns = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/user-dashboard/campaigns/${userId}`);
      setCampaigns(res.data.campaigns);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  // Fetch total donation amount
  const fetchDonations = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/user-dashboard/donations/${userId}`);
      setTotalDonation(res.data.totalDonation);
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  useEffect(() => {
    fetchCampaigns();
    fetchDonations();
    setLoading(false);
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>User Dashboard</h1>
      <div className="total-donations">
        <h2>Total Donations to Other Campaigns: ${totalDonation}</h2>
      </div>
      <div className="user-campaigns">
        <h2>Your Campaigns</h2>
        {campaigns.length === 0 ? (
          <p>You haven't created any campaigns yet.</p>
        ) : (
          <ul>
            {campaigns.map((campaign) => (
              <li key={campaign._id} className="campaign-card">
                <h3>{campaign.title}</h3>
                <p>{campaign.description}</p>
                <p>Location: {campaign.placeName}</p>
                <p>Target Amount: ${campaign.totalAmount}</p>
                <p>Raised Amount: ${campaign.raisedAmount}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
