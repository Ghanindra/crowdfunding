import React, { useEffect, useState } from "react";
import axios from "axios";
import './medical.css';  // Reusing the same CSS file
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import environment from '../assets/environment.jpg'; // Make sure to add an image in assets
import { useNavigate } from 'react-router-dom';

const Environment = () => {
  const [fundraisers, setFundraisers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/category/Environment", {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      .then((response) => {
        console.log("API Response:", response.data);
        setFundraisers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching environment campaigns:", error.response || error.message);
        setError("Unauthorized: Please log in to access fundraisers.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="medical-container">
      <Navbar />

      <div className="medical-content">
        <div className="medical-hero">
          {/* Left Side - Image */}
          <div className="medical-hero-image">
            <img src={environment} alt="Environment" className="doctor" />
          </div>

          {/* Right Side - Content */}
          <div className="medical-hero-content">
            <h1 className="business-hero-title">Support Environmental Fundraisers</h1>
            <p className="medical-hero-description">
              Join hands to protect our planet. Donate to environmental causes or create a fundraiser for conservation, sustainability, and nature protection.
            </p>
            <button className="medical-hero-button">Start a Fundraiser</button>
          </div>
        </div>

        {/* Loading & Error Handling */}
        {loading && <p className="medical-loading-error">Loading fundraisers...</p>}
        {error && <p className="medical-loading-error medical-loading-error-error">{error}</p>}

        {/* Fundraiser List */}
        <div className="medical-fundraiser-scroll-wrapper">
          <div className="browse">
            <h2>Browse Environmental Fundraisers</h2>
          </div>

          <div className="medical-fundraiser-list">
            {fundraisers.map((fundraiser) => (
              <div
                key={fundraiser.id}
                className="medical-fundraiser-card"
                onClick={() => navigate(`/donationpage`, { state: { fundraiser } })}
              >
                <img
                  src={`http://localhost:5000/${fundraiser.image}`}
                  alt={fundraiser.title}
                  className="medical-fundraiser-image"
                />
                <h3 className="medical-fundraiser-title">{fundraiser.title}</h3>
                <div className="medical-fundraiser-card-content">
                  <p className="medical-fundraiser-money">${fundraiser.targetAmount}</p>
                  <p className="medical-fundraiser-location">{fundraiser.placeName}</p>
                  {/* <p className="medical-fundraiser-description">{fundraiser.description}</p> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Environment;
