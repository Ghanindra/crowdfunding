


import React from "react";
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


const Fundraiser = () => {
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
        <button className="start-button">Start funding</button>
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

      {/* Footer Section */}
      <Footer/>
    </div>
  );
};

export default Fundraiser;
