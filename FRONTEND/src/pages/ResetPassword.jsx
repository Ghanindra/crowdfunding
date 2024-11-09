
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // To get the token from URL params (if using a token for reset)
// import './resetpassword.css'; // Import the CSS for styling

// const ResetPassword = () => {
//     const navigate=useNavigate();
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');
//     const[loading,setLoading]=useState(false)
//      // Handle password change
//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };
//   const handleResetPasswordSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     try {
//         // Send the reset request to the backend API
//         const response = await axios.post('http://localhost:5000/api/reset-password', {
//           password
//         });
  
//         if (response.status === 200) {
//           setMessage('Password reset successfully!');
//           // Navigate to login page or home page after successful reset
//           setTimeout(() => navigate('/'), 3000);
//         } else {
//           setMessage('Error resetting password. Please try again.');
//         }
//       } catch (error) {
//         console.error('Error resetting password:', error);
//         setMessage('Error resetting password. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };
//   return (
//     <div className="reset-password-container">
//       <h2>Reset Password</h2>
//       <form onSubmit={handleResetPasswordSubmit}>
//         <div>
//           <label>New Password:</label>
//           <input
//             type="password"
//             name='password'
//             id='password'
//             value={password}
//             onChange={handlePasswordChange}
//             placeholder="Enter new password"
//             required
//           />
//           </div>
//             <button type="submit" disabled={loading}>
//           {loading ? 'Resetting Password...' : 'Reset Password'}
//         </button>
//       </form>

//       {message && <p>{message}</p>}
//         </div>
       
//   );
// };

// export default ResetPassword