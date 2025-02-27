import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './profile.css';
import { useAuth } from '../context/AuthContext';
import { toast } from "react-toastify";
const Profile = () => {
  const { authData } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [file, setFile] = useState(null);
  const [objectURL, setObjectURL] = useState('');
  const [isVerified, setIsVerified] = useState(false); // Add state for verification status
  
  const navigate = useNavigate();
  // console.log(isVerified);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('auth-token');
        console.log(token)
        if (!token) {
          alert('Token not found, please log in again.');
          return;
        }

        const res = await axios.get('http://localhost:5000/api/profile', {
          headers: { 'auth-token': token },
        });
          console.log('profilepic',res.data.profilePicture);
          
        console.log(res.data.username);

        setUsername(res.data.username);
        setEmail(res.data.email);
        console.log('profile:',res.data.isVerified);
        
        setIsVerified(res.data.isVerified); // Set the verification status from the response

        if (res.data.profilePicture) {
          const imageUrl = `http://localhost:5000/${res.data.profilePicture}`;
          // console.log('image',imageUrl);
        
          setFile(imageUrl);
          setObjectURL(imageUrl);
          localStorage.setItem('profilePicture', imageUrl); // Store in localStorage

        }else {
          localStorage.removeItem('profilePicture'); // Remove if no profile picture
        }
      } catch (error) {
        console.error('Error fetching profile:', error.response ? error.response.data : error.message);
        toast.error('Error fetching profile information.');
      }
    };

    fetchProfile();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    
    if (file) {
      formData.append('file', file);
    }

    try {
      await axios.put(
        'http://localhost:5000/api/profiles',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'auth-token': localStorage.getItem('auth-token'),
          },
        }
      );
      setIsUpdated(true);
      
      setTimeout(() => setIsUpdated(false), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Profile update failed. Please try again.');
    }
  };

  const handleProfilePictureChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const objectURL = URL.createObjectURL(selectedFile);
      setObjectURL(objectURL);
      localStorage.setItem('profilePicture', objectURL); // Store in localStorage
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordClick = () => {
    if (window.confirm("To change password go to forgot page by clicking ok")) {
      navigate('/forgot'); // Navigate to the Forgot Password page
    }
  };
  console.log(isVerified);
  return (
    <div className="profile-container">
      <h2 className="profile-title">Update Profile</h2>

      {/* Profile Picture and Username Display */}
      <div className="profile-header">
        <div
          className="profile-picture-container"
          onClick={() => document.getElementById('file-input').click()} // Trigger file input on logo click
        >
          {file ? (
            <img
              src={objectURL || (file ? file : '/path/to/default/profile-pic.png')}
              alt="Profile"
              className="profile-image"
            />
          ) : (
            <div className="profile-placeholder">
              <span>Profile</span>
            </div>
          )}
        </div>
        <h3 className="username-display">
        
          
          {username} {isVerified && <FontAwesomeIcon icon={faCheckCircle} className="verified-icon" />} {/* Blue tick */}
        </h3>
      </div>

      <form onSubmit={handleProfileUpdate} className="profile-form">
        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            autoComplete="off"
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            readOnly // Prevent the email from being changed
            // onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            autoComplete="off"
            className="input-field"
          />
        </div>
        <div className="input-group password-group">
          <label>Password</label>
          <input
            type="text"
            value='' //empty value prop
            placeholder="Password (Click to change)"
            onClick={handlePasswordClick}  // Click handler to navigate to Forgot Password page
            className="input-field"
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            onClick={togglePasswordVisibility}
            className="password-eye-icon"
          />
        </div>

        <input
          type="file"
          id="file-input"
          name="profilePicture"
          accept="image/*"
          style={{ display: 'none' }} // Hide file input
          onChange={handleProfilePictureChange}
        />

        <button className="update-button" type="submit">
          Update Profile
        </button>
        {isUpdated && <p className="success-message">Profile updated successfully!</p>}
      </form>
      
      <button className="back-button" onClick={() => navigate('/dashboard')}>
        Back to Dashboard
      </button>
      <button
        className="verify-button"
        onClick={() => navigate('/verify_account')}
      >
        Verify Account
      </button>
    </div>
  );
};

export default Profile;

