import React from 'react';
import './AboutUs.css'; // Import the CSS for styling
import founder from "../assets/founder.jpg"; 
import ceo from "../assets/ceo.jpg"; 
const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1 className="about-us-title">About Us</h1>

      <p className="about-us-intro">
        Welcome to our platform! We are a team of passionate individuals committed to helping others through crowdfunding. Our mission is to empower individuals, communities, and organizations by providing a platform for them to raise funds and make a difference.
      </p>

      <section className="about-us-mission">
        <h2>Our Mission</h2>
        <p>
          Our mission is to make it easy for anyone with a good cause to raise money and create a lasting impact. We believe that anyone, regardless of background or financial status, can make a difference with the right support.
        </p>
      </section>

      <section className="about-us-team">
        <h2>Meet the Team</h2>
        <div className="team-member">
          <img src={founder} alt="Team Member" className="team-member-img" />
          <div className="team-member-info">
            <h3>Bibash Bohora</h3>
            <p>Founder & CEO</p>
            <p>Bibash is the visionary behind our platform, passionate about creating change and helping others succeed.</p>
          </div>
        </div>
        <div className="team-member">
          <img src={ceo} alt="Team Member" className="team-member-img" />
          <div className="team-member-info">
            <h3>Alish Gautam</h3>
            <p>CTO</p>
            <p>Alish leads our tech team, ensuring that our platform remains secure, efficient, and user-friendly.</p>
          </div>
        </div>
      </section>

      <section className="about-us-contact">
        <h2>Contact Us</h2>
        <p>If you have any questions or need assistance, feel free to <a href="mailto:support@ourplatform.com">reach out</a> to us!</p>
      </section>
    </div>
  );
};

export default AboutUs;
