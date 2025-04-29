import { useEffect, useState } from "react"
import axios from "axios"
import "./userManagement.css"
import { toast } from "react-toastify";
const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch users data from the backend
    axios
      .get("http://localhost:5000/api/admins/users")
      .then((response) => {
        setUsers(response.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching users:", err)
        setLoading(false)
      })
  }, [])

 

  const handleBlockUser = (userId) => {
    axios
      .patch(`http://localhost:5000/api/admins/users/${userId}/block`)
      .then((response) => {
        toast.success(response.data.message)
        setUsers(users.map((user) => (user._id === userId ? { ...user, status: "blocked" } : user)))
      })
      .catch((error) => console.error("Error blocking user:", error))
  }

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://localhost:5000/api/admins/users/${userId}`)
        .then((response) => {
          toast.success(response.data.message)
          setUsers(users.filter((user) => user._id !== userId))
        })
        .catch((error) => console.error("Error deleting user:", error))
    }
  }
  const handleUnblockUser = (userId) => {
    axios
      .patch(`http://localhost:5000/api/admins/users/${userId}/unblock`)
      .then((response) => {
        toast.success(response.data.message)
        setUsers(users.map((user) => (user._id === userId ? { ...user, status: "active" } : user)))
      })
      .catch((error) => console.error("Error unblocking user:", error))
  }
  // Helper function to get status class
  const getStatusClass = (status) => {
    switch (status) {
      case "active":
        return "status-active"
   
      case "blocked":
        return "status-blocked"
      default:
        return ""
    }
  }

  return (
    <div className="user-management-container">
      <div className="user-management-header">
        <h2>User Management</h2>
      </div>

      {loading ? (
        <div className="loading-spinner"></div>
      ) : users.length === 0 ? (
        <div className="empty-state">No users found</div>
      ) : (
        <div className="user-table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td className="user-email">{user.email}</td>
                  <td>
                    <span className={`user-status ${getStatusClass(user.status)}`}>
                      {user.status || "active"}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                 

                      {user.status !== "blocked" && (
                        <button className="btn btn-block" onClick={() => handleBlockUser(user._id)}>
                          Block
                        </button>
                      )}
                      {user.status === "blocked" && (
  <button className="btn btn-unblock" onClick={() => handleUnblockUser(user._id)}>
    Unblock
  </button>
)}

                      <button className="btn btn-delete" onClick={() => handleDeleteUser(user._id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default UserManagement
