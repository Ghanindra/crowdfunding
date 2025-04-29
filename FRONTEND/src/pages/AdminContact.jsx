

import { useEffect, useState } from "react"
import axios from "axios"
import { useLocation, useParams } from "react-router-dom"
import { Loader2 } from "lucide-react"
import "./admincontact.css"

const AdminContact = () => {
  const { contactId } = useParams()
  const location = useLocation()
  const contactFromState = location.state?.contact

  const finalContactId = contactId || contactFromState?.contactId

  const [data, setData] = useState(null)
  const [username, setUsername] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!finalContactId) return

    const fetchData = async () => {
      const token = localStorage.getItem("auth-token")

      try {
        const response = await axios.get(`http://localhost:5000/api/contact-submissions/${finalContactId}`)
        console.log("Full contact response:", response.data.submissions)

        const contactData = response.data.submissions.find((item) => item._id === finalContactId)

        if (contactData) {
          setData(contactData)

          // Fetch username from user database
          if (contactData.userId) {
            const userResponse = await axios.get(`http://localhost:5000/api/user/${contactData.userId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            console.log("usserid", userResponse.data)

            setUsername(userResponse.data.username)
          } else {
            setUsername("Anonymous")
          }
        } else {
          setError("Contact not found")
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [finalContactId])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <Loader2 className="loading-spinner" />
          <p className="loading-text">Loading contact information...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-text">Error: {error}</p>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="empty-container">
        <p className="empty-text">No contact information found</p>
      </div>
    )
  }

  return (
    <div className="contact-containers">
      <div className="contact-card">
        <div className="contact-header">
          <h2 className="contact-title">Contact Information</h2>
        </div>

        <div className="contact-body">
          <div className="user-info">
            <div className="user-avatar">{username ? username.charAt(0).toUpperCase() : "?"}</div>
            <div className="user-details">
              <p className="user-label">Submitted by</p>
              <p className="user-name">{username || "Fetching..."}</p>
            </div>
          </div>

          <div className="contact-details">
            <div className="detail-item">
              <p className="detail-label">Name</p>
              <p className="detail-value">{data.name}</p>
            </div>

            <div className="detail-item">
              <p className="detail-label">Email</p>
              <p className="detail-value">{data.email}</p>
            </div>
          </div>

          <div className="subject-container">
            <p className="detail-label">Subject</p>
            <p className="detail-value">{data.subject}</p>
          </div>

          <div className="message-container">
            <p className="detail-label">Message</p>
            <div className="message-content">{data.message}</div>
          </div>
        </div>

        <div className="contact-footer">
          <p className="contact-id">Contact ID: {finalContactId}</p>
        </div>
      </div>
    </div>
  )
}

export default AdminContact

