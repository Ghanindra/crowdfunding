// import React, { useState } from 'react';
// import axios from 'axios';
// import {useNavigate}from 'react-router-dom';
// import './Verify.css'; // Import the CSS file

// const Verify = () => {
//     const navigate=useNavigate();
//   const [otp, setOtp] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Handle OTP change
//   const handleOtpChange = (e) => {
//     setOtp(e.target.value);
//   };

//   // Handle OTP form submission
//   const handleOtpSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     try {
//       // Assuming you're sending OTP to backend for verification
//       const response = await axios.post('http://localhost:5000/api/verify-otp', { otp });

//       if (response.status === 200) {
//         setMessage('OTP verified successfully!');
//         navigate('/resetPassword')
//       } else {
//         setMessage('OTP verification failed.');
//       }
//     } catch (error) {
//       console.error('Error verifying OTP:', error);
//       setMessage('Error verifying OTP. Please try again.');
//     } finally {
//       setLoading(false);
//     }
    

//   };

//   return (
//     <div className="verify-container">
//       <h2>Verify OTP</h2>
//       <form onSubmit={handleOtpSubmit}>
//         <div>
//           <label>Enter OTP:</label>
//           <input
//             type="text"
//             value={otp}
//             onChange={handleOtpChange}
//             placeholder="Enter OTP"
//             required
//           />
//         </div>
//         <button type="submit" disabled={loading}>
//           {loading ? 'Verifying...' : 'Verify OTP'}
//         </button>
//       </form>

//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default Verify;

import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate}from 'react-router-dom';
import './Verify.css'; // Import the CSS file

const Verify = () => {
    const navigate=useNavigate();
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  // Handle OTP change
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  // Handle OTP form submission
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Assuming you're sending OTP to backend for verification
      const response = await axios.post('http://localhost:5000/api/verify-otp', { otp,password });

      if (response.status === 200) {
        alert('OTP verified successfully!');
        navigate('/')
      } else {
        setMessage('OTP verification failed.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setMessage('Error verifying OTP. Please try again.');
    } finally {
      setLoading(false);
    }
    

  };

  return (
    <div className="verify-container">
      <h2>Verify OTP</h2>
      <form onSubmit={handleOtpSubmit}>
        <div>
          <label>Enter OTP:</label>
          <input
            type="text"
            value={otp}
            name='otp'
            onChange={handleOtpChange}
            placeholder="Enter OTP"
            required
          />
           <label>New Password:</label>
          <input
            type="password"
        name='password'
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter new password"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Verify;
