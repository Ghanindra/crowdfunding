// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useLocation, useParams, useNavigate } from "react-router-dom";
// import './reportdetails.css'; // Import external CSS file

// const ReportDetails = () => {
//   const { reportId } = useParams();
//   const location = useLocation();
//   const reportFromState = location.state?.report; // Access report from state

//   const finalReportId = reportId || reportFromState?.reportId; // Use either

//   const [report, setReport] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [deleteLoading, setDeleteLoading] = useState(false); // To handle delete button loading
//   const navigate = useNavigate(); // Use useNavigate to handle navigation

//   // Get token from localStorage
//   const token = localStorage.getItem("auth-token");

//   useEffect(() => {
//     console.log("Final Report ID used:", finalReportId);

//     if (!finalReportId) {
//       setError("Invalid report ID.");
//       setLoading(false);
//       return;
//     }

//     const fetchReportDetails = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/reports-campaign/${finalReportId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`, // Include token in request headers
//             },
//           }
//         );
//         console.log("Fetched Report Details:", response.data);
//         setReport(response.data);
//       } catch (error) {
//         console.error("Error fetching report details:", error);
//         setError("Failed to load report details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReportDetails();
//   }, [finalReportId, token]);

//   const handleDelete = async () => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this report?");
//     if (confirmDelete) {
//       setDeleteLoading(true);
//       try {
//         const response = await axios.delete(
//           `http://localhost:5000/api/reports-campaign/${finalReportId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`, // Include token in request headers
//             },
//           }
//         );
//         console.log("Report deleted:", response.data);
//         if (response.data.success) {
//           navigate("/admin/reports"); // Redirect after deletion
//         }
//       } catch (error) {
//         console.error("Error deleting report:", error);
//         setError("Failed to delete report.");
//       } finally {
//         setDeleteLoading(false);
//       }
//     }
//   };

//   if (loading) return <p>Loading report details...</p>;
//   if (error) return <p className="error-message">{error}</p>;

//   return (
//     <div className="report-container">
//       <h2 className="report-title">Report Details</h2>
//       {report ? (
//         <div className="report-details">
//  <img src={`http://localhost:5000/${report.campaignId.image}`} alt={report.campaignId.title} className="campaign-image" />
//       {/* <p><strong>Title:</strong> {campaign.title}</p> */}
//       <p><strong>Target Amount:</strong> ${report.campaignId.targetAmount}</p>
//       <p><strong>Raised Amount:</strong> ${report.campaignId.raisedAmount}</p>
//       <p><strong>Description:</strong> {report.campaignId.description}</p>
//       <p><strong>Created By:</strong> {report.campaignId.userId}</p>
  
//           <p>Campaign: {report.campaignId?._id ? report.campaignId.title : "N/A"}</p>
          
//           <p>Reason: {report.reason}</p>
//           <button onClick={() => navigate(-1)} className='back'>Back</button>
//           {/* Delete Button with Confirmation */}
//           <button 
//             onClick={handleDelete} 
//             disabled={deleteLoading} 
//             className="delete-btn"
//           >
//             {deleteLoading ? "Deleting..." : "Delete Report"}
//           </button>
//         </div>
//       ) : (
//         <p>No report details available.</p>
//       )}
//     </div>
//   );
// };

// export default ReportDetails;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import './reportdetails.css';

const ReportDetails = () => {
  const { reportId } = useParams();
  const location = useLocation();
  const reportFromState = location.state?.report;

  const finalReportId = reportId || reportFromState?.reportId;
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [warningLoading, setWarningLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("auth-token");

  useEffect(() => {
    if (!finalReportId) {
      setError("Invalid report ID.");
      setLoading(false);
      return;
    }

    const fetchReportDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/reports-campaign/${finalReportId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setReport(response.data);
      } catch (error) {
        setError("Failed to load report details.");
      } finally {
        setLoading(false);
      }
    };
    fetchReportDetails();
  }, [finalReportId, token]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      setDeleteLoading(true);
      try {
        await axios.delete(
          `http://localhost:5000/api/reports-campaign/${finalReportId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        navigate("/admin/reports");
      } catch (error) {
        setError("Failed to delete report.");
      } finally {
        setDeleteLoading(false);
      }
    }
  };

  const handleWarning = async () => {
    setWarningLoading(true);
    try {
      await axios.post(
        `http://localhost:5000/api/reports-campaign/${finalReportId}/warning`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Warning sent successfully.");
    } catch (error) {
      setError("Failed to send warning.");
    } finally {
      setWarningLoading(false);
    }
  };

  if (loading) return <p>Loading report details...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="report-container">
      <h2 className="report-title">Report Details</h2>
      {report ? (
        <div className="report-details">
          <img src={`http://localhost:5000/${report.campaignId.image}`} alt={report.campaignId.title} className="campaign-imagess" />
          <p><strong>Target Amount:</strong> ${report.campaignId.targetAmount}</p>
          <p><strong>Raised Amount:</strong> ${report.campaignId.raisedAmount}</p>
          <p><strong>Description:</strong> {report.campaignId.description}</p>
          <p><strong>Created By:</strong> {report.campaignId.userId}</p>
          <p>Reason: {report.reason}</p>
          
          <button onClick={() => navigate(-1)} className='back'>Back</button>
          <button onClick={handleDelete} disabled={deleteLoading} className="delete-btn">
            {deleteLoading ? "Deleting..." : "Delete Report"}
          </button>
          <button onClick={handleWarning} disabled={warningLoading} className="warning-btn">
            {warningLoading ? "Sending Warning..." : "Send Warning"}
          </button>
        </div>
      ) : (
        <p>No report details available.</p>
      )}
    </div>
  );
};

export default ReportDetails;