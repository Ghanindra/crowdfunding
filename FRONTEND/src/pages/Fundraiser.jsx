import React, { useState, useEffect } from "react";
import { Link ,useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./fundraiser.css";
import cause from "../assets/cause.jpg";
import medical from "../assets/medical.webp";
import education from "../assets/education.webp";
import animal from "../assets/animal.avif";
import emergency from "../assets/emergency.avif";
import business from "../assets/business.webp";
import axios from "axios";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";


// Categories for the fundraising
const categories = [
  { name: "Your cause", image: cause, path: "/start" },
  { name: "Medical", image: medical, path: "/fundraiser/medical" },
  { name: "Education", image: education, path: "/fundraiser/education" },
  { name: "Animal", image: animal, path: "/fundraiser/animal" },
  { name: "Emergency", image: emergency, path: "/fundraiser/emergency" },
  { name: "Business", image: business, path: "/fundraiser/business" },
];

const Fundraiser = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [likedCampaigns, setLikedCampaigns] = useState([]); // Track liked campaigns locally

  // Get the token (usually from localStorage or cookies)
  const token = localStorage.getItem("auth-token");

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        console.log("Fetching campaigns..."); // Log before API call
        
        // Attach the token to the headers in the axios request
        const response = await axios.get("http://localhost:5000/api/like/campaigns", {
          headers: {
            Authorization: `Bearer ${token}`, // Bearer token in the Authorization header
          },
        });
        const data = response.data;

        console.log("Fetched campaigns:", data); // Log data after fetching

        // Ensure campaigns data is valid and likes are non-negative
        const updatedCampaigns = data.data.map(campaign => ({
          ...campaign,
          likeCount: Math.max(campaign.likeCount, 0), // Ensure like count is never negative
        }));

        setCampaigns(updatedCampaigns);
        const userLikedCampaigns = JSON.parse(localStorage.getItem("likedCampaigns")) || [];
        setLikedCampaigns(userLikedCampaigns); // Update local state with liked campaigns
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchCampaigns();
  }, [token]); // Adding token to dependency array ensures the effect reruns if the token changes

  // const handleLike = async (campaignId) => {
  //   if (likedCampaigns.includes(campaignId)) {
  //     // If the campaign is already liked by the user, remove the like
  //     await removeLike(campaignId);
  //   } else {
  //     // Otherwise, add the like to the campaign
  //     await addLike(campaignId);
  //   }
  // };
  const handleLike = async (campaignId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/updateLike",
        { campaignId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        const { liked, updatedLikeCount } = response.data;
  
        const updatedCampaigns = campaigns.map((campaign) =>
          campaign._id === campaignId
            ? { ...campaign, likeCount: updatedLikeCount }
            : campaign
        );
  
        setCampaigns(updatedCampaigns);
  
        const updatedLikedCampaigns = liked
          ? [...likedCampaigns, campaignId]
          : likedCampaigns.filter((id) => id !== campaignId);
  
        setLikedCampaigns(updatedLikedCampaigns);
        localStorage.setItem("likedCampaigns", JSON.stringify(updatedLikedCampaigns));
      }
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };
  // const addLike = async (campaignId) => {
  //   try {
  //     // Send a POST request to the backend to add a like with Bearer token
  //     const response = await axios.post(
  //       "http://localhost:5000/api/updateLike",
  //       { campaignId },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`, // Attach token to the request headers
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       const updatedCampaigns = campaigns.map((campaign) =>
  //         campaign._id === campaignId ? { ...campaign, likeCount: Math.max(campaign.likeCount + 1, 0) } : campaign
  //       );

  //       const updatedLikedCampaigns = [...likedCampaigns, campaignId];
  //       setLikedCampaigns(updatedLikedCampaigns);

  //       // Save the updated liked campaigns in local storage or session
  //       localStorage.setItem("likedCampaigns", JSON.stringify(updatedLikedCampaigns));

  //       setCampaigns(updatedCampaigns); // Update the campaigns list
  //     }
  //   } catch (error) {
  //     console.error("Error liking campaign:", error);
  //   }
  // };

  // const removeLike = async (campaignId) => {
  //   try {
  //     // Send a POST request to the backend to remove a like with Bearer token
  //     const response = await axios.post(
  //       "http://localhost:5000/api/updateLike",
  //       { campaignId },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`, // Attach token to the request headers
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       const updatedCampaigns = campaigns.map((campaign) =>
  //         campaign._id === campaignId ? { ...campaign, likeCount: Math.max(campaign.likeCount - 1, 0) } : campaign
  //       );

  //       const updatedLikedCampaigns = likedCampaigns.filter((id) => id !== campaignId);
  //       setLikedCampaigns(updatedLikedCampaigns);

  //       // Save the updated liked campaigns in local storage or session
  //       localStorage.setItem("likedCampaigns", JSON.stringify(updatedLikedCampaigns));

  //       setCampaigns(updatedCampaigns); // Update the campaigns list
  //     }
  //   } catch (error) {
  //     console.error("Error unliking campaign:", error);
  //   }
  // };

  // console.log("Campaigns state:", campaigns); // Log campaigns state before rendering

  return (
    <div>
      <Navbar />
      <section className="hero-section">
        <h1 className="hero-title">Successful fundraisers start here</h1>
        <p className="hero-description">
          More than <span className="highlight">$50 million</span> is raised every week on Crowdfunding.
        </p>
        <Link to="/campaignCreator">
          <button className="start-button">Start funding</button>
        </Link>
      </section>

      <section className="categories-section">
        <div className="categories-container">
          {categories.map((category, index) => (
            <div key={index} className="category-card">
              <Link to={category.path}>
                <img src={category.image} alt={category.name} className="category-image" />
                <span className="category-name">{category.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="donation-campaigns-section">
        <h2 className="section-title">Support These Campaigns</h2>
        <div className="donation-campaigns-container">
          {campaigns.length === 0 ? (
            <p>No campaigns available</p>
          ) : (
            campaigns.map((campaign) => (
              <div key={campaign._id} className="donation-card">
                <img
                  src={`http://localhost:5000/${campaign.image}`}
                  alt={`Image for ${campaign.title}`}
                  className="donation-card-image"
                />
                <div className="donation-card-details">
                  <h3 className="donation-card-title">{campaign.title}</h3>
                  <h3 className="donation-card-raiseamount">RaisedAmount: ${campaign.raisedAmount}</h3>
                  <h3 className="donation-card-targetamount">TargetAmount: ${campaign.targetAmount}</h3>
                  <div className="donation-card-likes">
                    <button
                      className="like-button"
                      onClick={() => handleLike(campaign._id)}
                    >
                      {/* {likedCampaigns.includes(campaign._id) ? "Unlike" : "Like"} */}
                      {likedCampaigns.includes(campaign._id) ? <FaThumbsDown /> : <FaThumbsUp />}

                    </button>
                    <span>{campaign.likeCount || 0} Likes</span>
                  </div>
                  <div className="donation-cards-actions">
                  <button onClick={() => navigate("/donationpage/payment", { state: { fundraiser: campaign } })}className="donate-buttons">
      Donate
    </button>
                    
                    <button onClick={() => navigate("/donationpage", { state: { fundraiser: campaign } })}className="learn-more-button">
      Learn More
    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Fundraiser;
