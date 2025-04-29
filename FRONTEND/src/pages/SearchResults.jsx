import React, { useState, useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import axios from "axios";
import "./searchResults.css";

const SearchResults = () => {
  const [campaign, setCampaign] = useState(null); // Store only one campaign
  const [query, setQuery] = useState(null);
  const location = useLocation();
  const navigate = useNavigate(); // Navigate hook for navigation
  // Update query from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const newQuery = queryParams.get("query");
    if (newQuery !== query) {
      setQuery(newQuery);
    }
  }, [location, query]);


  useEffect(() => {
    if (query) {
      const fetchCampaign = async () => {
        try {
          const encodedQuery = encodeURIComponent(query);
          console.log("Encoded query:", encodedQuery);
  
          // Fetch the matched campaign from backend
          const response = await axios.get(`http://localhost:5000/api/search?query=${encodedQuery}`);
          
          console.log("Search result:", response.data); // Log the entire response
  
          // Check the response structure - update based on response format
          if (Array.isArray(response.data)) {
            setCampaign(response.data[0]);  // Assuming the response is an array and you need the first result
          } else {
            setCampaign(response.data);  // Directly set the campaign if it's not an array
          }
        } catch (error) {
          console.error("Error fetching campaign:", error);
          setCampaign(null);
        }
      };
  
      fetchCampaign();
    }
  }, [query]);
  
// Navigate to DonationPage with the fundraiser data
const handleViewDetails = () => {
  console.log('clicked handledetails');
  
  navigate("/donationPage", { state: { fundraiser: campaign } });
};
  return (
    <div className="search-results">
      <h1>Search Results for: "{query}"</h1>
      {campaign ? (
        <div className="campaignn-card">
          <h2>{campaign.title}</h2>
           {/* Displaying the campaign image */}
           {campaign.image && (
     <img src={`http://localhost:5000/${campaign.image}`} alt={campaign.title} className="campaignn-image" />
          )}
          <p>Location: {campaign.placeName}</p>
          <p>{campaign.description}</p>
          <button onClick={handleViewDetails} className="view-details">View Details</button>
        
        </div>
      ) : (
        <p>No matching campaign found.</p>
      )}
    </div>
  );
};

export default SearchResults;
