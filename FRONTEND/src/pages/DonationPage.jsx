import React from "react";
import "./donationpage.css";

const DonationPage = () => {
  return (
    <div className="container">
      {/* Header */}
      <h1 className="header">
        Help Ryan Alto Fight Rare Brain Disease & Get Life-Saving Treatment
      </h1>

      {/* Main Section */}
      <div className="main-section">
        {/* Image & Info */}
        <div className="image-info">
          <img
            src="/path-to-image.jpg"
            alt="Fundraiser"
            className="fundraiser-image"
          />
          <p className="description">
            Kelly Helms is organizing this fundraiser. Your donations will help Ryan
            Alto receive critical medical treatment.
          </p>
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          <h2 className="amount-raised">$103,858 USD raised</h2>
          <p className="goal">$110K goal • 4.3K donations</p>
          
          {/* Progress Bar */}
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: "94%" }}></div>
          </div>

          {/* Buttons */}
          <div className="buttons">
            <button className="donate-button">Donate Now</button>
            <button className="share-button">Share</button>
          </div>

          {/* Recent Donations */}
          <div className="recent-donations">
            <p className="donations-text">4.3K people just donated</p>
            <ul className="donations-list">
              <li><strong>Pavel Volynsky</strong> - $200</li>
              <li><strong>Sharon McMahon</strong> - $1,000 (Top donation)</li>
              <li><strong>Jeny Giraud</strong> - $50 (First donation)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
