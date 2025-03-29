
// import React, { useState } from 'react';;
// import {Link} from 'react-router-dom'
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import {toast} from 'react-toastify'
// import Forgot from './Forgot';

// import './auth.css';
// // Import Font Awesome Icons
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// const Auth = () => {
  
//   const [view, setView] = useState('login'); // 'login', 'signup', 'forgotPassword'
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false); // For password visibility toggle
//   const [username, setUsername] = useState(''); // Only for signup
//   const [role, setRole] = useState(''); // Only for signup
//   const[secretKey,setSecretKey]=useState("");
//   const { signup } = useAuth(); // Use signup function from context
//   const navigate = useNavigate();
  

//   // Password strength validation for signup
// const validatePasswordStrength = (password) => {
//   const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, one letter, one number
//   return regex.test(password);
// };
  
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/login', {  email, password });
//       console.log('tt',res.data.token);
//       console.log('role',res.data.user.role);
//       console.log('user-id',res.data.user.user_id);
//       localStorage.setItem('auth-token', res.data.token);
//       localStorage.setItem('user-role', res.data.user.role); // Save the role as 'admin' or other roles like 'user'
//       localStorage.setItem('user-id', res.data.user.user_id); // Store user ID

    



//     if(res.data.user.role=='admin'){
      

//       navigate('/admindashboard');
//     }
//     else{

    
//       toast.success("login successfully")
  

//       navigate('/fundraiser')
//     }
//     } catch (error) {
//       if (error.response && error.response.data) {
//         toast.error(error.response.data.message || "Login failed. Please check your credentials.");
//       } else {
//         toast.error("An error occurred. Please try again later.");
//       }
//     }
  
//   };
 
//   const handleSignup = async (e) => {
//     if(role=='admin'&& secretKey!="bibash"){
//       toast.error("invalid admin")
//     }
  
//     // if (secretKey==""){
//     //   alert("field secret key")
//     // }
//     e.preventDefault();
//     signup(username);
//     const usernameRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/; // Ensures at least one letter and allows numbers
//   if (!usernameRegex.test(username)) {
//     toast.error('Username must contain letters and cannot be only numbers.');
//     return;
//   }
//     if (!validatePasswordStrength(password)) {
//       toast.error('Password must be at least 8 characters long and contain at least one letter and one number.');
//       return;
//     }

  
//     try {
//       await axios.post('http://localhost:5000/api/signup', { username, email, password, role ,secretKey});
    
//       setView('login'); // Redirect to login after signup
//     } catch (error) {
//       console.error(error.response.data);
//       toast.error(error.response.data.message || "Signup failed. Please try again.");
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };
//   const loginwithgoogle=()=>{
//       window.open('http://localhost:5000/auth/google/callback',"self")
//       navigate('/')
//     }
//   return (
//     <div className="auth-container">
//       {view === 'login' && (
//         <form onSubmit={handleLogin}>
//           <h2>Login</h2>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//             name='email'
//             required
//              autoComplete="off" 
//           />
//           <div className="password-container">
//             <input
//               type={showPassword ? 'text' : 'password'} // Toggle between text and password
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password"
//               name='password'
//               required
//                autoComplete="off" 
//             />
//             <FontAwesomeIcon
//               icon={showPassword ? faEyeSlash : faEye}
//               onClick={togglePasswordVisibility}
//               className="eye-icon"
//             />
//           </div>
//           <button className='submit' type="submit">Login</button>
//           <p>
//             Not registered?{' '}
//             <span onClick={() => setView('signup')}>
//               Create an account
//             </span>
//           </p>
//           <p>
//             <span>
//            <Link to='/forgot'> Forgot Password?</Link>  
//             </span>
//           </p>
//         </form>
//       )}

//       {view === 'signup' && (
//         <form onSubmit={handleSignup}>
         
//           <h2>Signup</h2>
//        {role=='admin'?
//           <input
//             type="text"
//             value={secretKey}
//             onChange={(e) => setSecretKey(e.target.value)}
//             placeholder="Secret key"
//             name='secret key'
//             required
//              autoComplete="off" 
//           />:null}
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Username"
//             name='username'
//             required
//              autoComplete="off" 
//           />
          
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             name='email'
//             placeholder="Email"
//             required
//             autoComplete="off"  // Add this line
//           />
//           <div className="password-container">
//             <input
//               type={showPassword ? 'text' : 'password'}
//               value={password}
//               name='password'
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password"
//               required
//                autoComplete="off"  // Add this line
//             />
//             <FontAwesomeIcon
//               icon={showPassword ? faEyeSlash : faEye}
//               onClick={togglePasswordVisibility}
//               className="eye-icon"
//             />
//           </div>
//           <select value={role} onChange={(e) => setRole(e.target.value)}>
       
//             <option value="user">User</option>
//             <option value="admin">Admin</option>
//             {/* <option value="admin">Admin</option> */}
//           </select>
//           <button className='submit' type="submit">Signup</button>
//           <button className='login-with-google-btn' onClick={loginwithgoogle}>sign In with google</button>
//           <p>
//             Already have an account?{' '}
//             <span onClick={() => setView('login')}>
//               Login here
//             </span>
//           </p>
//         </form>
//       )}

//     </div>
//   );

// };

// export default Auth;



import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faUser, faEnvelope, faLock, faKey } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import './auth.css';

const Auth = () => {
  const [view, setView] = useState('login'); // 'login', 'signup', 'forgotPassword'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // For password visibility toggle
  const [username, setUsername] = useState(''); // Only for signup
  const [role, setRole] = useState(''); // Only for signup
  const [secretKey, setSecretKey] = useState("");
  const { signup } = useAuth(); // Use signup function from context
  const navigate = useNavigate();

  // Password strength validation for signup
  const validatePasswordStrength = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, one letter, one number
    return regex.test(password);
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', { email, password });
      console.log('tt', res.data.token);
      console.log('role', res.data.user.role);
      console.log('user-id', res.data.user.user_id);
      localStorage.setItem('auth-token', res.data.token);
      localStorage.setItem('user-role', res.data.user.role); // Save the role as 'admin' or other roles like 'user'
      localStorage.setItem('user-id', res.data.user.user_id); // Store user ID

      if(res.data.user.role=='admin'){
        navigate('/admindashboard');
      } else {
        toast.success("login successfully")
        navigate('/fundraiser')
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Login failed. Please check your credentials.");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };
 
  const handleSignup = async (e) => {
    e.preventDefault();
    
    if(role=='admin' && secretKey!="bibash"){
      toast.error("Invalid admin key");
      return;
    }
    
    signup(username);
    const usernameRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/; // Ensures at least one letter and allows numbers
    if (!usernameRegex.test(username)) {
      toast.error('Username must contain letters and cannot be only numbers.');
      return;
    }
    
    if (!validatePasswordStrength(password)) {
      toast.error('Password must be at least 8 characters long and contain at least one letter and one number.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/signup', { username, email, password, role, secretKey });
      setView('login'); // Redirect to login after signup
    } catch (error) {
      console.error(error.response.data);
      toast.error(error.response.data.message || "Signup failed. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const loginwithgoogle = () => {
    window.open('http://localhost:5000/auth/google/callback', "self");
    navigate('/');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>{view === 'login' ? 'Welcome Back' : 'Create Account'}</h1>
          <p>{view === 'login' ? 'Sign in to continue' : 'Join our community today'}</p>
        </div>

        <div className="auth-body">
          {view === 'login' && (
            <form onSubmit={handleLogin} className="auth-form">
              <div className="form-group">
                <div className="input-icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  name="email"
                  required
                  autoComplete="off"
                />
              </div>
              
              <div className="form-group">
                <div className="input-icon">
                  <FontAwesomeIcon icon={faLock} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  name="password"
                  required
                  autoComplete="off"
                />
                <button 
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="password-toggle"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              
              <div className="forgot-password">
                <Link to="/forgot">Forgot Password?</Link>
              </div>
              
              <button type="submit" className="submit-button">
                Sign In
              </button>
              
              <div className="divider">
                <span>Or continue with</span>
              </div>
              
              <button 
                type="button"
                onClick={loginwithgoogle}
                className="google-button"
              >
                <FontAwesomeIcon icon={faGoogle} />
                <span>Sign in with Google</span>
              </button>
              
              <p className="switch-view">
                Don't have an account?{' '}
                <span onClick={() => setView('signup')}>
                  Create an account
                </span>
              </p>
            </form>
          )}

          {view === 'signup' && (
            <form onSubmit={handleSignup} className="auth-form">
              {role === 'admin' && (
                <div className="form-group">
                  <div className="input-icon">
                    <FontAwesomeIcon icon={faKey} />
                  </div>
                  <input
                    type="text"
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    placeholder="Secret key"
                    name="secret key"
                    required
                    autoComplete="off"
                  />
                </div>
              )}
              
              <div className="form-group">
                <div className="input-icon">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  name="username"
                  required
                  autoComplete="off"
                />
              </div>
              
              <div className="form-group">
                <div className="input-icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  name="email"
                  required
                  autoComplete="off"
                />
              </div>
              
              <div className="form-group">
                <div className="input-icon">
                  <FontAwesomeIcon icon={faLock} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  name="password"
                  required
                  autoComplete="off"
                />
                <button 
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="password-toggle"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              
              <div className="form-group select-wrapper">
                <select 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="" disabled selected>Select Role</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <div className="select-arrow">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              
              <button type="submit" className="submit-button">
                Create Account
              </button>
              
              <div className="divider">
                <span>Or continue with</span>
              </div>
              
              <button 
                type="button"
                onClick={loginwithgoogle}
                className="google-button"
              >
                <FontAwesomeIcon icon={faGoogle} />
                <span>Sign up with Google</span>
              </button>
              
              <p className="switch-view">
                Already have an account?{' '}
                <span onClick={() => setView('login')}>
                  Sign in
                </span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
