// // // src/components/Signup.js
// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';

// // const Signup = () => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [role, setRole] = useState('donor');
// //   const navigate = useNavigate();

// //   const handleSignup = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await axios.post('http://localhost:5000/api/auth/signup', { email, password, role });
// //       navigate('/login'); // Redirect to login after signup
// //     } catch (error) {
// //       console.error(error.response.data);
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSignup}>
// //       <h2>Signup</h2>
// //       <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
// //       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
// //       <select value={role} onChange={(e) => setRole(e.target.value)}>
// //         <option value="donor">Donor</option>
// //         <option value="creator">Creator</option>
// //         <option value="admin">Admin</option>
// //       </select>
// //       <button type="submit">Signup</button>
// //     </form>
// //   );
// // };

// // export default Signup;

// // src/components/Signup.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Signup = () => {
//   const [username, setUsername] = useState(''); // New state for username
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('donor');
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       // Include username in the request payload
//       await axios.post('http://localhost:5000/api/auth/signup', { username, email, password, role });
//       navigate('/login'); // Redirect to login after signup
//     } catch (error) {
//       console.error(error.response.data);
//     }
//   };

//   return (
//     <form onSubmit={handleSignup}>
//       <h2>Signup</h2>
//       <input
//         type="text"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         placeholder="Username"
//         required
//       />
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//         required
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//         required
//       />
//       <select value={role} onChange={(e) => setRole(e.target.value)}>
//         <option value="donor">Donor</option>
//         <option value="creator">Creator</option>
//         <option value="admin">Admin</option>
//       </select>
//       <button type="submit">Signup</button>
//     </form>
//   );
// };

// export default Signup;
