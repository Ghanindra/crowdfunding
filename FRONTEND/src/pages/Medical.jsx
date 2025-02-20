import React, { useEffect, useState } from "react";
import axios from "axios";
import './medical.css';  // Importing the external CSS file
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import doctor from '../assets/doctor.jpg';

const Medical = () => {
  const [fundraisers, setFundraisers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for navigation
  useEffect(() => {
    const token = localStorage.getItem("token"); // Get token from storage (or cookies)
    
    axios
      .get("http://localhost:5000/api/campaigns/Medical", {
        headers: {
          Authorization: `Bearer ${token}`  // Send token in the request
        },
      })
      .then((response) => {
        console.log("API Response:", response.data); // Debugging log
        setFundraisers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching medical campaigns:", error.response || error.message);
        setError("Unauthorized: Please log in to access fundraisers.");
        setLoading(false);
      });
  }, []);

  
return (
  <div className="medical-container">
    <Navbar />

    {/* Wrap hero and fundraisers inside medical-content */}
    <div className="medical-content">
      <div className="medical-hero">
        {/* Left Side - Doctor Image */}
        <div className="medical-hero-image">
          <img src={doctor} alt="Doctor" className="doctor" />
        </div>

        {/* Right Side - Content */}
        <div className="medical-hero-content">
          <h1 className="medical-hero-title">Discover Medical Fundraisers</h1>
          <p className="medical-hero-description">
            Help others by donating to their fundraiser, or start one for someone you care about.
          </p>
          <button className="medical-hero-button">Start a GoFundMe</button>
        </div>
      </div>

      {/* Loading & Error Handling */}
      {loading && <p className="medical-loading-error">Loading fundraisers...</p>}
      {error && <p className="medical-loading-error medical-loading-error-error">{error}</p>}

      {/* Fundraiser List */} 
      <div className="browse">
        <h2>Browse Medical Fundraisers</h2>
      </div>

      <div className="medical-fundraiser-list">
        {fundraisers.map((fundraiser) => (
          <div key={fundraiser.id} className="medical-fundraiser-card" onClick={() => navigate(`/donationpage`, { state: {fundraiser ,campaignId: fundraiser.id}})}
          >
            <img src={`http://localhost:5000/${fundraiser.image}`} alt={fundraiser.title} className="medical-fundraiser-image" />
            <h3 className="medical-fundraiser-title">{fundraiser.title}</h3>
            <div className="medical-fundraiser-card-content">
              <p className="medical-fundraiser-money">${fundraiser.targetAmount}</p>
              <p className="medical-fundraiser-location">{fundraiser.placeName}</p>
              <p className="medical-fundraiser-description">{fundraiser.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Footer */}
    <Footer />
  </div>
);
}
export default Medical;
