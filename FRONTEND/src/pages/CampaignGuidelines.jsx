import React from 'react';
import './CampaignGuidelines.css'; // Import the CSS for styling

const CampaignGuidelines = () => {
  return (
    <div className="guidelines-container">
      <h1 className="guidelines-title">Campaign Guidelines</h1>

      <p className="guidelines-intro">
        Before you create your campaign, please review the following guidelines to ensure your campaign meets our platform's requirements.
      </p>

      <ol className="guidelines-steps">
        <li><strong>Clear Purpose:</strong> Clearly define your campaign's goal. Whether it’s for a charity, a personal cause, or a project, ensure that the purpose is transparent and easy to understand.</li>
        <li><strong>Accurate Information:</strong> Provide accurate details about your campaign, including where the funds will go and how they will be used.</li>
        <li><strong>Compelling Story:</strong> Share your story to connect with potential donors. Personal stories often resonate with supporters.</li>
        <li><strong>Visual Appeal:</strong> Add high-quality images and videos to show the campaign’s authenticity. Visuals help build trust and engagement.</li>
        <li><strong>Legal Compliance:</strong> Ensure your campaign complies with local and international laws. Avoid promoting illegal or harmful activities.</li>
        <li><strong>Realistic Goals:</strong> Set achievable funding goals. Make sure the amount you ask for aligns with your project’s needs.</li>
      </ol>

      <div className="guidelines-footer">
        <p>By following these guidelines, you ensure that your campaign has the best chance of success. We’re here to support you every step of the way!</p>
      </div>
    </div>
  );
};

export default CampaignGuidelines;
