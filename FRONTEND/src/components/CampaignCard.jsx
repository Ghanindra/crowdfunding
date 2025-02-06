import React from 'react'


    const CampaignCard = ({ title, description, amountRaised, targetAmount }) => (
        <div className="campaign-card">
          <h3>{title}</h3>
          <p>{description}</p>
          <div className="funding">
            <p>Raised: ${amountRaised} / Target: ${targetAmount}</p>
          </div>
        </div>
      );
      
      export default CampaignCard;
    

