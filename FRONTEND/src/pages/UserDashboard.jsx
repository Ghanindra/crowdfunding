import React, { useEffect, useState } from "react";
import axios from "axios";
import "./userdashboard.css";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [totalDonation, setTotalDonation] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [newMilestone, setNewMilestone] = useState({
    title: "",
    description: "",
    amountSpent: "",
    images: [] // Store multiple images
  });
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);
  const navigate = useNavigate();

  // Retrieve userId from localStorage on mount
  useEffect(() => {
    const storedUserId = localStorage.getItem("user-id");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.error("User ID not found in localStorage");
    }
  }, []);

  // Fetch campaigns and donations once userId is set
  useEffect(() => {
    if (userId) {
      fetchCampaigns();
      fetchDonations();
      setLoading(false);
    }
  }, [userId]);

  const fetchCampaigns = async () => {
    try {
      if (!userId) {
        console.error("User ID is undefined");
        return;
      }
      const res = await axios.get(`http://localhost:5000/api/user-dashboard/campaigns/${userId}`);
      setCampaigns(res.data.campaigns);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  const fetchDonations = async () => {
    try {
      if (!userId) {
        console.error("User ID is undefined");
        return;
      }
      const res = await axios.get(`http://localhost:5000/api/user-dashboard/donations/${userId}`);
      setTotalDonation(res.data.totalDonation);
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  const handleMilestoneChange = (e) => {
    const { name, value } = e.target;
    setNewMilestone((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewMilestone((prev) => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const handleAddMilestone = async (campaignId) => {
    try {
      let { title, description, amountSpent, images } = newMilestone;
      if (!title || !description || !amountSpent || images.length === 0) {
        alert("All fields and at least one image are required!");
        return;
      }
  
      // Convert amountSpent to a number
      amountSpent = Number(amountSpent);
  
      // Create FormData and append fields
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("amountSpent", amountSpent);
      
      // Append each image under the same field name "images"
      images.forEach((image) => {
        formData.append("images", image);
      });
  
      // Log FormData entries for debugging
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
  
      // Send data to the backend
      await axios.post(
        `http://localhost:5000/api/campaigns/${campaignId}/milestones`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
  
      alert("Milestone added successfully!");
      setNewMilestone({ title: "", description: "", amountSpent: "", images: [] });
      fetchCampaigns();
    } catch (error) {
      console.error("Error adding milestone:", error);
    }
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1 className="userdashboardh1">User Dashboard</h1>

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
                <h3>Title: {campaign.title}</h3>
                <p>Description: {campaign.description}</p>
                <p>Location: {campaign.placeName}</p>
                <img
                  src={`http://localhost:5000/${campaign.image}`}
                  alt={campaign.title}
                  className="userdshboard-fundraiser-image"
                />
                <p>Target Amount: ${campaign.targetAmount}</p>
                <p>Raised Amount: ${campaign.raisedAmount}</p>

                <button
                  className="add-milestone-button"
                  onClick={() => setSelectedCampaignId(campaign._id)}
                >
                  Add Milestone
                </button>

                {selectedCampaignId === campaign._id && (
                  <div className="milestone-form">
                    <h3>Add Milestone</h3>
                    <input
                      type="text"
                      name="title"
                      placeholder="Milestone Title"
                      value={newMilestone.title}
                      onChange={handleMilestoneChange}
                    />
                    <textarea
                      name="description"
                      placeholder="Milestone Description"
                      value={newMilestone.description}
                      onChange={handleMilestoneChange}
                    />
                    <input
                      type="number"
                      name="amountSpent"
                      placeholder="Amount Spent"
                      value={newMilestone.amountSpent}
                      onChange={handleMilestoneChange}
                    />
                    {/* Custom file input label for multiple images */}
                    <label className="file-input-label">
                      Upload Images
                      <input
                        type="file"
                        name="images"
                        multiple
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                      />
                    </label>
                    {/* Optionally show selected image names */}
                    {newMilestone.images.length > 0 && (
                      <div className="selected-images">
                        <p>Selected Images:</p>
                        <ul>
                          {newMilestone.images.map((file, index) => (
                            <li key={index}>{file.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <button onClick={() => handleAddMilestone(campaign._id)}>
                      Submit Milestone
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <button className="back-button" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>
    </div>
  );
};

export default UserDashboard;
