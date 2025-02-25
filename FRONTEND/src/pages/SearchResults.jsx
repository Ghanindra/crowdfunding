// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import "./searchResults.css";

// const SearchResults = () => {
//   const [campaigns, setCampaigns] = useState([]);
//   const [query, setQuery] = useState(null); // Add a state to hold the query value
//   const location = useLocation();
  
//   // When location changes, update the query
//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const newQuery = queryParams.get("query");
//     if (newQuery !== query) {  // Only set the query if it is different
//       setQuery(newQuery);
//     }
//   }, [location, query]); // Dependency on location to detect query change

//   // Fetch search results when query changes
//   useEffect(() => {
//     if (query) {
//       const fetchResults = async () => {
//         try {
//           const encodedQuery = encodeURIComponent(query);
//           console.log('Encoded query:', encodedQuery);
          
//           const response = await axios.get(`http://localhost:5000/api/search?query=${encodedQuery}`);
//           console.log('Search results:', response.data);
          
//           setCampaigns(response.data); // Update the state
//         } catch (error) {
//           console.error("Error fetching search results:", error);
//         }
//       };

//       fetchResults(); // Fetch the results when query changes
//     }
//   }, [query]); // Only re-run when query changes

//   return (
//     <div className="search-results">
//       <h1>Search Results for: "{query}"</h1>
//       {campaigns.length > 0 ? (
//         <ul>
//           {campaigns.map((campaign) => (
//             <li key={campaign._id} className="campaign-card">
//               <h2>{campaign.title}</h2>
//               <p>Location: {campaign.location}</p>
//               <p>{campaign.description}</p>
//               <a href={`/category/${campaign._id}`} className="view-details">View Details</a>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No campaigns found.</p>
//       )}
//     </div>
//   );
// };

// export default SearchResults;



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

  // Fetch the matched campaign
  // useEffect(() => {
  //   if (query) {
  //     const fetchCampaign = async () => {
  //       try {
  //         const encodedQuery = encodeURIComponent(query);
  //         console.log("Encoded query:", encodedQuery);

  //         // Fetch the matched campaign from backend
  //         const response = await axios.get(`http://localhost:5000/api/search?query=${encodedQuery}`);
  //         console.log("Search result:", response.data);

  //         // Ensure a single matched campaign is stored
  //         setCampaign(response.data);
  //       } catch (error) {
  //         console.error("Error fetching campaign:", error);
  //         setCampaign(null);
  //       }
  //     };

  //     fetchCampaign();
  //   }
  // }, [query]);
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
        <div className="campaign-card">
          <h2>{campaign.title}</h2>
           {/* Displaying the campaign image */}
           {campaign.image && (
     <img src={`http://localhost:5000/${campaign.image}`} alt={campaign.title} className="campaign-image" />
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
