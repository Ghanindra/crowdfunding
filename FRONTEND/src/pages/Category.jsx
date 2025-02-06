import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "./Category.css"; // Import external CSS

const categories = [
  { name: "Medical", icon: "❤️" },
  // { name: "Memorial", icon: "🕯️" },
  { name: "Emergency", icon: "🚨" },
  // { name: "Nonprofit", icon: "🎗️" },
  { name: "Education", icon: "🎓" },
  { name: "Animal", icon: "🐶" },
  { name: "Environment", icon: "🌱" },
  { name: "Business", icon: "🏢" },
  { name: "cause", icon: "🤝" },
  // { name: "Competition", icon: "🏆" },
  // { name: "Creative", icon: "💡" },
  // { name: "Event", icon: "📅" },
];

const Category = () => {
  const navigate = useNavigate();

  return (
   
    <div className="category-container">
         <Navbar/>
      {/* Heading Section */}
      <h1 className="category-title">Browse Fundraisers by Category</h1>
      <p className="category-description">
        People around the world are raising money for what they are passionate about.
      </p>

      {/* Start Campaign Button */}
      <button onClick={() => navigate("/campaignCreator")} className="start-campaign-btn">
        Start a Campaign
      </button>

      {/* Categories Grid */}
      <div className="category-grid">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => navigate(`/category/${category.name.toLowerCase()}`)}
            className="category-cards"
          >
            <span className="category-icon">{category.icon}</span>
            <p className="category-name">{category.name}</p>
          </div>
            
        ))}
            
      </div>
  {/* <Footer/> */}
    </div>
   
  );
  
};

export default Category;
