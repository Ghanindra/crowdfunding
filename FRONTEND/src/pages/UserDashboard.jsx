

import { useEffect, useState } from "react"
import axios from "axios"
import "./userdashboard.css"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
const UserDashboard = () => {
  const [campaigns, setCampaigns] = useState([])
  const [totalDonation, setTotalDonation] = useState(0)
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState(null)
  const [newMilestone, setNewMilestone] = useState({
    title: "",
    description: "",
    amountSpent: "",
    images: [], // Store multiple images
  })
  const [selectedCampaignId, setSelectedCampaignId] = useState(null)
  const navigate = useNavigate()

  // Retrieve userId from localStorage on mount
  useEffect(() => {
    const storedUserId = localStorage.getItem("user-id")
    if (storedUserId) {
      setUserId(storedUserId)
    } else {
      console.error("User ID not found in localStorage")
    }
  }, [])

  // Fetch campaigns and donations once userId is set
  useEffect(() => {
    if (userId) {
      fetchCampaigns()
      fetchDonations()
      setLoading(false)
    }
  }, [userId])

  const fetchCampaigns = async () => {
    try {
      if (!userId) {
        console.error("User ID is undefined")
        return
      }
      const res = await axios.get(`http://localhost:5000/api/user-dashboard/campaigns/${userId}`)
      setCampaigns(res.data.campaigns)
    } catch (error) {
      console.error("Error fetching campaigns:", error)
    }
  }

  const fetchDonations = async () => {
    try {
      if (!userId) {
        console.error("User ID is undefined")
        return
      }
      const res = await axios.get(`http://localhost:5000/api/user-dashboard/donations/${userId}`)
      setTotalDonation(res.data.totalDonation)
    } catch (error) {
      console.error("Error fetching donations:", error)
    }
  }

  const handleMilestoneChange = (e) => {
    const { name, value } = e.target
    setNewMilestone((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setNewMilestone((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }))
  }

  const handleAddMilestone = async (campaignId) => {
    try {
      let { title, description, amountSpent, images } = newMilestone
      if (!title || !description || !amountSpent || images.length === 0) {
        toast.error("All fields and at least one image are required!")
        return
      }

      // Convert amountSpent to a number
      amountSpent = Number(amountSpent)

      // Create FormData and append fields
      const formData = new FormData()
      formData.append("title", title)
      formData.append("description", description)
      formData.append("amountSpent", amountSpent)

      // Append each image under the same field name "images"
      images.forEach((image) => {
        formData.append("images", image)
      })

      // Send data to the backend
      await axios.post(`http://localhost:5000/api/campaigns/${campaignId}/milestones`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      toast.success("Milestone added successfully!")
      setNewMilestone({ title: "", description: "", amountSpent: "", images: [] })
      setSelectedCampaignId(null) // Close the form
      fetchCampaigns()
    } catch (error) {
      console.error("Error adding milestone:", error)
    }
  }

  // Close milestone form
  const closeMilestoneForm = () => {
    setSelectedCampaignId(null)
  }

  if (loading) {
    return <div>Loading...</div>
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
          <div className="campaigns-grids">
            {campaigns.map((campaign) => (
              <div key={campaign._id} className="campaign-cardss">
                <div className="campaign-content">
                  <div className="campaign-details">
                    <h3>{campaign.title}</h3>
                   
                    <p>
                      <strong>Location:</strong> {campaign.placeName}
                    </p>
                  </div>

                  <img
                    src={`http://localhost:5000/${campaign.image}`}
                    alt={campaign.title}
                    className="userdshboard-fundraiser-image"
                  />
 <p>
                      <strong>Description:</strong> {campaign.description}
                    </p>
                  <p>
                    <strong>Target Amount:</strong> ${campaign.targetAmount}
                  </p>
                  <p>
                    <strong>Raised Amount:</strong> ${campaign.raisedAmount}
                  </p>
                </div>

                <button className="add-milestone-button" onClick={() => setSelectedCampaignId(campaign._id)}>
                  Add Milestone
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Milestone form as overlay */}
      {selectedCampaignId && (
        <>
          <div className="milestone-overlay" onClick={closeMilestoneForm}></div>
          <div className="milestone-form">
            <button className="close-milestone-form" onClick={closeMilestoneForm}>
              ×
            </button>
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
              <input type="file" name="images" multiple onChange={handleImageChange} style={{ display: "none" }} />
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
            <button onClick={() => handleAddMilestone(selectedCampaignId)}>Submit Milestone</button>
          </div>
        </>
      )}

      <div className="dashboard-actions">
        <button className="payment-history-button" onClick={() => navigate("/paymentHistory")}>
          💳 View Payment History
        </button>
        <button className="back-button" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
      </div>
    </div>
  )
}

export default UserDashboard
