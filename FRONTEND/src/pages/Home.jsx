
import React from 'react';
import{Link} from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import charity from '../assets/charity1.webp'
import webUser from '../assets/bibash.jpg'
import offline from '../assets/offline.avif'
import early from '../assets/early.webp'
import time from '../assets/time.avif'
import share from '../assets/share.avif'

import './home.css';
const Home = () => {
  return (
    <div className='all'>
       <Navbar/>
    <div className="change-section">
  
      <div className="text-content">
       
        <h3>Donate money</h3>
        <h1>
        Make a difference begins now.</h1>
        <p>
          {/* Support the causes you believe in. We’ll cover your transaction fees<sup>1</sup> when you give in the app or on our website. */}
          Contribute to the causes you care about. We’ll take care of transaction fees<sup>1</sup> when you donate through our app or website."
        </p>
        <div className="button-group">
         <Link to='/login'><button className="sign-up-button">Login</button></Link> 
          <button className="get-app-button">Get the App</button>
        </div>
      </div>
      <div className="image-content">
        <img src={charity} alt="Hands stacked together" />
      </div>
      </div>
    <div className="testimonial">
    <p className="quote">
    "<b>The webapp made tracking the fundraiser incredibly convenient.</b> Since I always have my phone with me, accessing it was just a tap away. Receiving notifications for each donation was thrilling, and it allowed me to quickly thank everyone who contributed."
    </p>
    <div className="user-info">
      <img src={webUser} alt="User" className="user-image" />
      <span className="username">Bibash</span>
      <span className="user-role">web user</span>
    </div>
  </div>

  {/* Fundraising Tips Section */}
  <h2>How can you achieve successful fundraising?</h2>
  <div className="fundraising-tips">
    <div className="tip-card">
      <img src={share} alt="Tip 1" />
      <h3>Spread the word among friends and family</h3>
      <ul>
        <li>Promote your fundraiser with a unique, personal message.
     </li>
        <li>   Encourage others to join in and help share your cause.</li>
      </ul>
    </div>
    <div className="tip-card">
      <img src={offline} alt="Tip 2" />
      <h3>Promote widely through offline channels.</h3>
      <ul>
        <li>Distribute flyers at local events, share on community boards, or pitch the story to local news outlets.</li>
        <li>Reach out to foundations that have previously supported similar initiatives.</li>
      </ul>
    </div>
    <div className="tip-card">
      <img src={time} alt="Tip 3" />
      <h3>Set up the process for withdrawals ahead of time.</h3>
      <ul>
        <li>Make sure to prepare the withdrawal process well in advance or notify your beneficiary ahead of time to ensure a smooth and efficient transaction when the time comes. This allows for proper planning and avoids any delays or complications later.</li>
      </ul>
    </div>
    <div className="tip-card">
      <img src={early} alt="Tip 4" />
      <h3>Reach out to team members.</h3>
      <ul>
        <li>Include your friends and family as part of the team to assist with the fundraising efforts and help spread the word to reach a wider audience. Their support can make a significant impact on achieving your fundraising goals.</li>
      </ul>
    </div>
  </div>
  <Footer/>
  </div>
  );
};

export default Home;




