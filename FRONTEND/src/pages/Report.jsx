import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./report.css";
import { ToastContainer, toast } from "react-toastify";
const ReportList = () => {
  // const { id } = useParams(); // Get report ID from URL
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("auth-token");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/reports-campaign", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReports(response.data);
      } catch (error) {
        setError("Failed to load reports.");
        toast.error("Error loading reports!"); // Toast here
      } finally {
        setLoading(false);
      }
    };
    

    fetchReports();
  }, [token]);

  if (loading) return <p>Loading reports...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="report-containers">
      <h2 className="report-titles">All Reports</h2>
      {reports.length > 0 ? (
        <ul className="report-lists">
          {reports.map((report) => (
            <li key={report._id} className="report-items">
              {report.campaignId && (
                <>
                  <img 
                    src={`http://localhost:5000/${report.campaignId.image}`} 
                    alt={report.campaignId.title} 
                    className="campaign-images" 
                  />
                  <p><strong>Title:</strong> {report.campaignId.title}</p>
                  <p><strong>Target Amount:</strong> ${report.campaignId.targetAmount}</p>
                  <p><strong>Raised Amount:</strong> ${report.campaignId.raisedAmount}</p>
                </>
              )}
              <p><strong>Reason:</strong> {report.reason}</p>
              <p><strong>Reported on:</strong> {new Date(report.createdAt).toLocaleDateString()}</p>
              <button onClick={() => navigate(`/report/${report._id}`)} className="view-btn">
                View Details
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reports found.</p>
      )}
    </div>
  );
};

export default ReportList;
