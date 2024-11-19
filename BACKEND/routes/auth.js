
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
// const Profile = require('../models/profile');
const router = express.Router();
const multer = require('multer');
const nodemailer=require('nodemailer');
const { Verification_Email_Template } = require('../libs/EmailTemplate.jsx');
// import { Verification_Email_Template } from '../libs/EmailTemplate';
router.post('/signup', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Check if the username, email, and password are provided
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    // Check for existing user by username and email
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    console.log(password)
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password:', hashedPassword);
    const newUser = new User({ username, email, password: hashedPassword, role,secretKey });
    
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' ,role});
  } catch (error) {
    console.error('Error during signup:', error); // Log the full error object
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});



// Login route
router.post('/login', async (req, res) => {
    const { username,email, password } = req.body;
    console.log('Request Body:', req.body);
    
    try {
      // Find the user by username or email
      const user = await User.findOne({
        $or: [{ email: email }, { username: username }]
      });
      
      if (!user) {
        console.log('User not found for:', username || email);
        return res.status(400).json({ message: 'Invalid Email or username' });
      }
  
      // Log the stored hashed password for debugging purposes
      console.log('Stored Hashed Password:', user.password);
  
      // Compare the provided password with the hashed password
      console.log('Provided Password:', password); // Log the incoming password



      const isMatch = await bcrypt.compare(password, user.password);
  
      // Log the result of password comparison
      console.log('Password Match Result:', isMatch);
  
      if (!isMatch) {
        console.log('Password did not match for:', username || email);
        return res.status(400).json({ message: ' Password did not match' });
      }
  
      // Generate JWT token upon successful login
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      //  res.json({ token, user: { username: user.username, email: user.email, role: user.role }
      res.cookie('auth_token', token, { httpOnly: true, secure: true, maxAge: 3600000 }); // Add `secure: true` if using HTTPS
      

    //  res.cookie("token",token,{
    //     httpOnly:true,
    //     secure:true,

      
     return res.json({ token, user: { username: user.username, email: user.email, role: user.role },
     });
    // return res.json({message:'user logged in successfully'})
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Invalid Email or Password', error: error.message });
    }
  });

  //forgot page
  
router.post('/forgots',async(req,res)=>{
  const { email }=req.body;
  try {
   
    const generateOtp=Math.floor(Math.random()*10000);//four digit otp
    // Looking to send emails in production? Check out our Email API/SMTP product!
   
    var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure:false,
  auth: {
    user: "bohoraghanindra@gmail.com",
    pass: "ssso lorx iofz nwcc"  ,
  },

});
 

const info = await transporter.sendMail({
  from: 'bohoraghanindra@gmail.com', // sender address
  to: email, // list of receivers
  subject: "New OTP Generated", // Subject line
  html: Verification_Email_Template(  `<b>OTP is : <i>${generateOtp}</i></b>`), // html body
});
if(info.messageId){
  let user=await User.findOneAndUpdate(
    {email},
    {otp:generateOtp},
    {new:true}

  );
  

  if (!user) {
    return res.status(400).json({ message: 'User does not exist' });
  }
}
  return res.status(200).json({message:"otp sent successfully"})

  } catch (error) {
   return res.status(500).json({message:error.message}) 
  }
})
// router.post('/verify-otp',async(req,res)=>{
//   const{otp}=req.body;
//   try {
//   let user=await User.findOne({otp});
//     if(!user){
//       return res.status(400).json({message:'invalid otp'})
//     }
//    user=await User.findOneAndUpdate({otp},
//    { otp:0},
//     {new:true}
//     );
//     return res.status(200).json({message: 'otp verified successfully'})
//   } catch (error) {
//     return res.status(500).json({message:error.message});
//   }
// })
// router.post('/reset-password',async(req,res)=>{
// const{password}=req.body;
// try {
//   // const securePassword=await bcrypt.hash(password,10);
// user=await User.findOneAndUpdate(
//   {password},
//   {new:true}
// );

// return res.status(200).json({message:"Password updated successfully"});
// }
//  catch (error) {
//   return res.status(500).json({message:error.message});
//  }
// });








router.post('/verify-otp',async(req,res)=>{
  const{otp,password}=req.body;
  try {
  let user=await User.findOne({otp});
    if(!user){
      return res.status(400).json({message:'invalid otp'})
    }
     const securePassword=await bcrypt.hash(password,10);
   user=await User.findOneAndUpdate({otp},
    {password:securePassword,otp:0},
    {new:true}
    );
    return res.status(200).json({message:"Password updated successfully"});
   
  } catch (error) {
    return res.status(500).json({message:error.message});
  }
})



//profile update

const verifyToken = (req, res, next) => {
  const token = req.headers['auth-token'];
  console.log('Token received:', token); // Debugging check
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded JWT:', decoded); // Debugging check
    req.user = decoded;
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error); // Debugging check
    res.status(400).json({ message: 'Invalid token.' });
  }
};

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload= multer({ storage });

// Route to get user profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json(user)
    console.log(user);
    ;
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to update user profile
router.put('/profiles', verifyToken, upload.single('file'), async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: 'User not found.' });
  // Check if the file is available in req.file
  console.log('Uploaded File:', req.file);  // Debugging check
  console.log('Request Body:', req.body);   // Check if other data is being received
    // Update fields if provided
    user.username = username || user.username;
    user.email = email || user.email;
    if (password) user.password = await bcrypt.hash(password, 10);

    if (req.file){

    
      console.log('Saving profile picture:', req.file.path);  // Debugging check
      user.profilePicture = req.file.path;
    } else {
      // If no file is uploaded, retain the existing profile picture or set a default
      if (!user.profilePicture) {
        // No existing profile picture, set a default
        user.profilePicture = 'path/to/default-image.jpg'; // Replace with actual default image path
      }
    }

    await user.save();
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Add the router to your main server file (e.g., app.js)
// Export the router
module.exports = router;
