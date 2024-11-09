


import React, { useState } from 'react';;
import {Link} from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Forgot from '../pages/Forgot';

import './auth.css';
// Import Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Auth = () => {
  const [view, setView] = useState('login'); // 'login', 'signup', 'forgotPassword'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // For password visibility toggle
  const [username, setUsername] = useState(''); // Only for signup
  const [role, setRole] = useState('donor'); // Only for signup
  const navigate = useNavigate();
  // const [newPassword, setNewPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  // const [token, setToken] = useState(''); // Assume you will get this from the URL
  

  // Password strength validation for signup
const validatePasswordStrength = (password) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, one letter, one number
  return regex.test(password);
};
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', {  email, password });
      localStorage.setItem('auth-token', res.data.token);

       
      const userRole = res.data.role;
      if (userRole === 'donor') {
        navigate('/donordashboard'); // Redirect to donor dashboard
      } else if (userRole === 'creator') {
        navigate('/creatordashboard'); // Redirect to creator dashboard
      } else if (userRole === 'admin') {
        navigate('/admindashboard'); // Redirect to admin dashboard
      } else {
        navigate('/admindashboard'); // Default redirect if role is unknown
      }
      alert("login successfully")
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.message || "Login failed. Please check your credentials.");
      } else {
        alert("An error occurred. Please try again later.");
      }
    }
  };
 
  const handleSignup = async (e) => {
    e.preventDefault();
    const usernameRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/; // Ensures at least one letter and allows numbers
  if (!usernameRegex.test(username)) {
    alert('Username must contain letters and cannot be only numbers.');
    return;
  }
    if (!validatePasswordStrength(password)) {
      alert('Password must be at least 8 characters long and contain at least one letter and one number.');
      return;
    }

  
    try {
      await axios.post('http://localhost:5000/api/signup', { username, email, password, role });
      setView('login'); // Redirect to login after signup
    } catch (error) {
      console.error(error.response.data);
      alert(error.response.data.message || "Signup failed. Please try again.");
    }
  };

  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const loginwithgoogle=()=>{
      window.open('http://localhost:5000/auth/google/callback',"self")
    }
  return (
    <div className="auth-container">
      {view === 'login' && (
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            name='email'
            required
             autoComplete="off" 
          />
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'} // Toggle between text and password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              name='password'
              required
               autoComplete="off" 
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={togglePasswordVisibility}
              className="eye-icon"
            />
          </div>
          <button className='submit' type="submit">Login</button>
          <p>
            Not registered?{' '}
            <span onClick={() => setView('signup')}>
              Create an account
            </span>
          </p>
          <p>
            <span>
           <Link to='/forgot'> Forgot Password?</Link>  
            </span>
          </p>
        </form>
      )}

      {view === 'signup' && (
        <form onSubmit={handleSignup}>
          <h2>Signup</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            name='username'
            required
             autoComplete="off" 
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name='email'
            placeholder="Email"
            required
            autoComplete="off"  // Add this line
          />
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              name='password'
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
               autoComplete="off"  // Add this line
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={togglePasswordVisibility}
              className="eye-icon"
            />
          </div>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="donor">Donor</option>
            <option value="creator">Creator</option>
            <option value="admin">Admin</option>
          </select>
          <button className='submit' type="submit">Signup</button>
          <button className='login-with-google-btn' onClick={loginwithgoogle}>sign In with google</button>
          <p>
            Already have an account?{' '}
            <span onClick={() => setView('login')}>
              Login here
            </span>
          </p>
        </form>
      )}

    </div>
  );

};

export default Auth;
