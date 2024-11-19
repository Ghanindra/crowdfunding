// import React,{useState} from 'react'
// import { Link,useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Auth from './Auth.jsx';
// import './forgot.css'
// const Forgot = () => {
//     const [email, setEmail] = useState(''); 
//     const navigate=useNavigate();
//     const handleForgotPassword = async (e) => {
//         e.preventDefault();
  
//         const res=  await axios.post('http://localhost:5000/api/forgots', { email});
        
//           const data=await res.data;
//           console.log(data)
//           alert('OTP sent successfully');
          
//           navigate('/verify');
//         // } catch (error) {
//         //   console.error(error.response.data);
//         //   alert(error.response.data.message || "Failed to send reset instructions.");
//         // }
//     };
      
//   return (
//     <div>
//         <div className="forgot-container">
//  <form onSubmit={handleForgotPassword}>
//     <div className="forgot-form">
//     <h2>Forgot Password</h2>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             required
//           />
//           <button className='submit' type="submit">Send OTP</button>
//           <p>
//             Remember your password?{' '}
//             {/* <span onClick={() => setView('login')}> */}
//               <Link to='/'>Login here</Link>
//             {/* </span> */}
//           </p> 
//     </div>
          
//         </form> 
//     </div>
//     </div>
//   )
// }

// export default Forgot


import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './forgot.css';  // Import the CSS file

const Forgot = () => {
  // State hooks for email input, loading state, and message display
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate();

  // Function to handle the forgot password form submission
  const handleForgotPassword = async (e) => {
    e.preventDefault();  // Prevent the default form submission behavior
    setLoading(true); // Set loading state to true

    try {
      // Sending the email to the backend API for OTP generation
      const response = await axios.post('http://localhost:5000/api/forgots', { email });

      // If successful, set the success message and navigate to the verify page
      setMessage(response.data.message);
      alert('otp sent successfully')
      navigate('/verify');
    } catch (error) {
      // If there's an error, display the error message
      setMessage('Error sending OTP. Please try again.');
    } finally {
      // Stop the loading state after request completion
      setLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <form onSubmit={handleForgotPassword} className="forgot-form">
        <h2>Forgot Password</h2>

        {/* Email input field */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />

        {/* Submit button with loading state */}
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Loading...' : 'Send OTP'}
        </button>

        {/* Display the message (error or success) */}
        {message && <p className="message">{message}</p>}

        {/* Link to login page */}
        <p>
          Remember your password?{' '}
          <Link to="/">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Forgot;
