import React, { useEffect, useState } from "react";
import './start.css';
import Navbar from '../components/Navbar';
import family from '../assets/families.webp'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Start = () => {
    const [featuredFundraiser, setFeaturedFundraiser] = useState(null);
    const navigate = useNavigate();
    const handleCardClick = () => {
      navigate('/donationpage', { state: { fundraiser: featuredFundraiser } }); // 👈 passing fundraiser as state
    };
    useEffect(() => {
      const token = localStorage.getItem("token");
  
      axios
        .get("http://localhost:5000/api/category/Project?limit=1", {
          headers: {
            Authorization: `Bearer ${token}`
          },
        })
        .then((response) => {
          // Assuming the API returns an array
          const fundraiser = response.data[0];
          console.log("Fetched fundraiser:", fundraiser); // ✅ Logs the full object
          console.log("Fundraiser image path:", fundraiser?.image); // ✅ Logs the image path
          setFeaturedFundraiser(fundraiser);
        })
        .catch((error) => {
          console.error("Error fetching featured fundraiser:", error);
        });
    }, []);
  return (
    <div className="start-container">
      {/* Navbar at the top */}
      <Navbar />

      {/* Hero Section */}
      <div className="hero-sections">
        <div className="hero-text">
          <h1>Start a funding in Minutes</h1>
          <p>Everything you need to help your fundraiser succeed is here.</p>
          <button 
  className="hero-button" 
  onClick={() => navigate('/campaignCreator')}
>
  Start a Crowdfunding
</button>
        </div>
        <div className="cause-image">
          <img src={family}alt="Family" />
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="feature-box">No fee to start your fundraiser</div>
        <div className="feature-box">Reach your goals with help from our smart tools</div>
        <div className="feature-box">Secure payment methods to receive your money</div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
      <p>
    More than $50M is raised a week on Crowdfunding platform <br />
    to support people like you.
  </p>
        <div className="stats-icons">
          <div className="icon green"></div>
          <div className="icon gray"></div>
          <div className="icon dark-gray"></div>
        </div>
      </div>

      {/* How to Start Section */}
      <div className="how-to-start-section">
        <h2>How to start a Crowdfunding platform</h2>
        <div className="steps">
          <div className="step-box">
            <h3>Step 1</h3>
            <p id='para'>Our tools help create your fundraiser</p>
            <p>Click the ‘Start a GoFundMe’ button to get started. You’ll be guided by prompts to add fundraiser details and set your goal, which can be changed anytime.</p>
          </div>
          <div className="step-box">
            <h3>Step 2</h3>
            <p id='para'>Share your fundraiser link to reach donors</p>
            <p>Once live, share your fundraiser link with friends and family to start gaining momentum. You’ll also find helpful resources for running your fundraiser in your GoFundMe dashboard.</p>
          </div>
          <div className="step-box">
            <h3>Step 3</h3>
            <p id='para'>Securely receive the funds you raise</p>
            <p>Add your bank information, or invite your intended recipient to add theirs, to securely start receiving funds. You don’t need to reach your fundraising goal to start receiving funds.</p>
          </div>
        </div>
      </div>
         {/* 🩺 Featured Medical Campaign */}
         {featuredFundraiser && (

<div className="featured-campaign">
  
  <h2>Example of  Project Fundraiser</h2>
  <div className="campaign-cardd" onClick={handleCardClick} style={{ cursor: "pointer" }}>
  <img
src={`http://localhost:5000/${featuredFundraiser.image.replace(/\\/g, '/')}`}
alt={featuredFundraiser.title}
className="campaign-picture"
/>


    
    <h3>{featuredFundraiser.title}</h3>
    <p><strong>Target:</strong> ${featuredFundraiser.targetAmount}</p>
    <p><strong>Raised Amount:</strong> ${featuredFundraiser.raisedAmount}</p>
    <p><strong>Location:</strong> {featuredFundraiser.placeName}</p>
    {/* <p className="campaign-description">{featuredFundraiser.description?.slice(0, 100)}...</p> */}
  </div>
  
</div>
    
)}
    </div>
  );
};

export default Start;
