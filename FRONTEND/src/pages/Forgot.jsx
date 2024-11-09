import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Auth from '../components/Auth.jsx';
import './forgot.css'
const Forgot = () => {
    const [email, setEmail] = useState(''); 
    const navigate=useNavigate();
    const handleForgotPassword = async (e) => {
        e.preventDefault();
  
        const res=  await axios.post('http://localhost:5000/api/forgots', { email});
          const data=await res.data;
          console.log(data)
          alert('OTP sent successfully');
          
          navigate('/verify');
        // } catch (error) {
        //   console.error(error.response.data);
        //   alert(error.response.data.message || "Failed to send reset instructions.");
        // }
    };
      
  return (
    <div>
        <div className="forgot-container">
 <form onSubmit={handleForgotPassword}>
    <div className="forgot-form">
    <h2>Forgot Password</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <button className='submit' type="submit">Send OTP</button>
          <p>
            Remember your password?{' '}
            {/* <span onClick={() => setView('login')}> */}
              <Link to='/'>Login here</Link>
            {/* </span> */}
          </p> 
    </div>
          
        </form> 
    </div>
    </div>
  )
}

export default Forgot