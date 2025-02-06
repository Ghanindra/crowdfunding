
import React,{useState} from "react";
import {Link}from 'react-router-dom'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "./fundraiser.css";
import cause from '../assets/cause.jpg';
import medical from '../assets/medical.webp';
import education from '../assets/education.webp';
import animal from '../assets/animal.avif';
import emergency from '../assets/emergency.avif';
import business from '../assets/business.webp';

// Dummy Data for Categories
const categories = [
    { name: "Your cause", image: cause, path: "/cause" },
    { name: "Medical", image: medical, path: "/medical" },
    { name: "Education", image: education, path: "/education" },
    { name: "Animal", image: animal, path: "/animal" },
    { name: "Emergency", image: emergency, path: "/emergency" },
    { name: "Business", image: business, path: "/business" },
  ];
  const donationCampaigns = [
    { 
      title: "Support Local Causes", 
      image: cause, 
      path: "/donate/cause",
      likeCount: 100,
      donatePath: "/donate/cause",
      learnMorePath: "/learn/cause"
    },
    { 
      title: "Save Lives, Donate Now", 
      image: medical, 
      path: "/donate/medical",
      likeCount: 150,
      donatePath: "/category/medical",
      learnMorePath: "/learn/medical"
    },
    { 
      title: "Help Educate the Future", 
      image: education, 
      path: "/donate/education",
      likeCount: 200,
      donatePath: "/donate/education",
      learnMorePath: "/learn/education"
    },
    { 
      title: "Save Our Animals", 
      image: animal, 
      path: "/donate/animal",
      likeCount: 50,
      donatePath: "/donate/animal",
      learnMorePath: "/learn/animal"
    },
    { 
      title: "Emergency Relief Fund", 
      image: emergency, 
      path: "/donate/emergency",
      likeCount: 300,
      donatePath: "/donate/emergency",
      learnMorePath: "/learn/emergency"
    },
    { 
      title: "Support Small Businesses", 
      image: business, 
      path: "/donate/business",
      likeCount: 80,
      donatePath: "/donate/business",
      learnMorePath: "/learn/business"
    },
];


  


const Fundraiser = () => {
    const [likes, setLikes] = useState(
        donationCampaigns.reduce((acc, campaign) => {
          acc[campaign.title] = campaign.likeCount;
          return acc;
        }, {})
      );
      const handleLike = (campaignTitle) => {
        setLikes((prevLikes) => ({
          ...prevLikes,
          [campaignTitle]: prevLikes[campaignTitle] + 1,
        }));
      };
  return (
    <div>
      {/* Navbar Section */}
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">Successful fundraisers start here</h1>
        <p className="hero-description">
          More than <span className="highlight">$50 million</span> is raised every week on GoFundMe.
        </p>
       <Link to='/campaignCreator' ><button className="start-button">Start funding</button></Link>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="categories-container">
          {categories.map((category, index) => (
            <div key={index} className="category-card">
            <Link to={category.path}><img src={category.image} alt={category.name} className="category-image" /></Link>
              <span className="category-name">{category.name}</span>
            </div>
          ))}
        </div>
      </section>
{/* Donation Campaigns Section */}
<section className="donation-campaigns-section">
        <h2 className="section-title">Support These Campaigns</h2>
        <div className="donation-campaigns-container">
          {donationCampaigns.map((campaign) => (
            <div key={campaign.title} className="donation-card">
              <img src={campaign.image} alt={`Image for ${campaign.title}`} className="donation-card-image" />
              <div className="donation-card-details">
                <h3 className="donation-card-title">{campaign.title}</h3>
                <div className="donation-card-likes">
                  <button 
                    className="like-button"
                    onClick={() => handleLike(campaign.title)}
                  >
                    Like
                  </button>
                  <span>{likes[campaign.title]} Likes</span>
                </div>
                <div className="donation-card-actions">
                  <Link to={campaign.donatePath} className="donate-button">Donate</Link>
                  <Link to={campaign.learnMorePath} className="learn-more-button">Learn More</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Footer Section */}
      <Footer/>
    </div>
  );
};

export default Fundraiser;

