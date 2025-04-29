import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./managecampaign.css"
import ConfirmModal from "../components/ConfirmModal"
import { toast } from "react-toastify"

const ManageCampaign = () => {
  const [campaigns, setCampaigns] = useState([])
  const [reportedCampaignIds, setReportedCampaignIds] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedCampaignId, setSelectedCampaignId] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/campaigns")
        if (res.data && Array.isArray(res.data.data)) {
          setCampaigns(res.data.data)
        } else {
          console.error("Invalid campaign data format:", res.data)
        }
      } catch (error) {
        toast.error("Error fetching campaigns")
        console.error("Error fetching campaigns:", error)
      }
    }

    fetchCampaigns()
  }, [])

 
  const handleDeleteClick = (id) => {
    setSelectedCampaignId(id)
    setShowModal(true)
  }

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/campaigns/${selectedCampaignId}`)
      setCampaigns((prev) => prev.filter((campaign) => campaign._id !== selectedCampaignId))
      toast.success("Campaign deleted successfully")
    } catch (error) {
      toast.error("Error deleting campaign")
      console.error("Error deleting campaign:", error)
    } finally {
      setShowModal(false)
      setSelectedCampaignId(null)
    }
  }

  const handleCancelDelete = () => {
    setShowModal(false)
    setSelectedCampaignId(null)
  }

  return (
    <div className="manage-campaigns">
      <h2>Manage Campaigns</h2>

      {campaigns.length === 0 ? (
        <p>No campaigns available.</p>
      ) : (
        <div className="campaign-lists">
          {campaigns.map((campaign) => (
            <div key={campaign._id} className="campaign-card">
              <div className="image-wrapper">
                <img
                  src={`http://localhost:5000/${campaign.image}`}
                  alt={campaign.title}
                  className="campaign-images"
                />
                {reportedCampaignIds.includes(campaign._id) && (
                  <span className="red-dot" title="This campaign has been reported"></span>
                )}
              </div>

              <h3>{campaign.title}</h3>

              <div className="scroll-container">
                <div className="campaign-contents">
                  <p>{campaign.description}</p>
                </div>
              </div>

              <div className="campaign-actions">
                <button
                  className="view-btn"
                  onClick={() =>
                    navigate(`/campaigns/${campaign._id}`, { state: { campaign } })
                  }
                >
                  View Details
                </button>
                <button className="delete-btn" onClick={() => handleDeleteClick(campaign._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <ConfirmModal
          title="Confirm Delete"
          message="Are you sure you want to delete this campaign?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  )
}

export default ManageCampaign
