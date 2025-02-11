import React from "react";
import './start.css';
import Navbar from '../components/Navbar';
import family from '../assets/families.webp'
const Start = () => {
  return (
    <div className="start-container">
      {/* Navbar at the top */}
      <Navbar />

      {/* Hero Section */}
      <div className="hero-sections">
        <div className="hero-text">
          <h1>Start a funding in Minutes</h1>
          <p>Everything you need to help your fundraiser succeed is here.</p>
          <button className="hero-button">Start a Crowdfunding</button>
        </div>
        <div className="hero-image">
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
    </div>
  );
};

export default Start;
