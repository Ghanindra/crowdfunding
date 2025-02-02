
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const Campaign = require('../models/campaign');
const Notification = require('../models/Notification');
const verifyAccount = require('../models/VerifyAccount');

// const Profile = require('../models/profile');
const router = express.Router();
const multer = require('multer');
const nodemailer=require('nodemailer');
const authenticate = require('../middleware/authenticate'); // Path to your auth middleware
const { Verification_Email_Template } = require('../libs/EmailTemplate.jsx');
const { io } = require('../index'); // Ensure io is imported from server.js



router.post('/signup', async (req, res) => {
  const { username, email, password, role ,secretKey} = req.body;

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
      console.log('User for login:', user);
      // Generate JWT token upon successful login
      const token = jwt.sign({ id: user._id, role: user.role,  username: user.username,}, process.env.JWT_SECRET, { expiresIn: '1h' });
      //  res.json({ token, user: { username: user.username, email: user.email, role: user.role })
      res.cookie('auth_token', token, { httpOnly: true, secure: true, maxAge: 3600000 }); // Add `secure: true` if using HTTPS
      


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

// verify otp

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






const verifyToken = (req, res, next) => {
  const token = req.headers['auth-token'];
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Session expired. Please log in again.' });
    }
    return res.status(400).json({ message: 'Invalid token.' });
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
    if (!user)
     return res.status(404).json({ message: 'User not found.' });
  
    let isVerified = false; // Default value

    try {
      const verification = await verifyAccount.findOne({ userId: req.user.id });
      
      if (verification) {
        console.log("Verification document found:", verification);
        isVerified = verification.status === 'approved'; // ✅ Update verification status
      } else {
        console.log("No verification document found for user.");
      }
    } catch (verificationError) {
      console.error("Error fetching verification details:", verificationError);
    }
    return res.json({
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
         profileStatus: user.profileStatus,  // Include the profile status
      isVerified,  // Include the verification status
    });
    // console.log(user);
    
  } catch (error) {
    console.error('Error fetching profile:', error);
   return res.status(500).json({ message: 'Server error' });
  }
});

// Route to update user profile
router.put('/profiles', verifyToken, upload.single('file'), async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findById(req.user.id);
console.log(req.body)
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



// Notification route

router.get('/campaigns', async (req, res) => {
  try {
   
    const campaigns = await Campaign.find({ status: 'pending' });
    res.json({ data: campaigns });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
});
router.put('/campaigns/:id', async (req, res) => {
  const { status } = req.body;
  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const Campaign= await Campaign.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json({ message: `Campaign ${status}` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update campaign status' });
  }
});


// Fetch unread notification count
router.get('/notifications/count', async (req, res) => {
  try {
    const count = await Notification.countDocuments({ isRead: false });
    res.json({ count });
  } catch (error) {
    console.error('Error fetching notification count:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});
// Mark notifications as read
router.put('/notifications/mark-as-read', async (req, res) => {
  try {
    await Notification.updateMany({ isRead: false }, { isRead: true });
    res.json({ message: 'Notifications marked as read' });
  } catch (error) {
    console.error('Error updating notifications:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});






// verify account code 

router.post('/verify_account', authenticate, upload.single('citizenshipImage'), async (req, res) => {
  const { documentNumber, issueDate, issuedFrom } = req.body;
  console.log('Uploaded File:', req.file);

  if (!req.file) {
    return res.status(400).json({ message: 'Document image is required.' });
  }

  if (!documentNumber || !issueDate || !issuedFrom) {
    return res.status(400).json({ message: 'Required fields are missing.' });
  }
// Log the entire req.user to see if the username is available
console.log('User Info in Backend:', req.user);
  try {
    const verification = new verifyAccount({
      userId: req.user.id,
      documentNumber,
      issueDate,
      issuedFrom,
      citizenshipImage: `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`,

    });

    await verification.save();
     // Log username to the backend console
     console.log('Username in Backend:', req.user.username); // Logging username in the backend
// Store notification in the database
const notification = new Notification({
  userId: req.user.id,
  documentNumber,
  issueDate,
  issuedFrom,
  username: req.user.username, // Add username here
  citizenshipImage: verification.citizenshipImage,
  status: 'pending', // Initially pending
  isRead: false,
  type: 'verification', // ✅ Add this field to prevent validation error
});

console.log(notification)
await notification.save();
    // Emit notification to admin
     // Ensure io is defined before emitting
     if (global.io) {
      global.io.emit('new_verification', notification);
    } else {
      console.warn('Socket.io is not initialized.');
    }

    res.status(201).json({ message: 'Verification submitted successfully and admin notified in real-time.' });
  } catch (error) {
    console.error('Error during verification submission:', error);
    res.status(500).json({ message: 'Verification submission failed.', error });
  }
});
// Example route to fetch the user's verification status
router.get('/user/verification-status', authenticate, async (req, res) => {
  try {
    const verification = await verifyAccount.findOne({ userId: req.user.id });

    if (!verification) {
      return res.status(404).json({ message: 'Verification not found.' });
    }

    // Send back the verification status and other details
    res.status(200).json({
      status: verification.status,
      citizenshipImage: verification.citizenshipImage,
      documentNumber: verification.documentNumber,
      issueDate: verification.issueDate,
      issuedFrom: verification.issuedFrom,
    });
  } catch (error) {
    console.error('Error fetching verification status:', error);
    res.status(500).json({ message: 'Failed to fetch verification status.', error });
  }
});

router.get('/admin/notifications', async (req, res) => {
  try {
    // const notifications = await Notification.find().sort({ createdAt: -1 });
    const notification = await Notification.find({ status: 'pending' }).sort({ createdAt: -1 });
 

  
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notifications.', error });
  }
});
router.put('/admin/notifications/:id', async (req, res) => {
  const { status } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value.' });
  }

  try {
    const notification = await Notification.findById(req.params.id);
    
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found.' });
    }

    // Update notification status
    notification.status = status;
    notification.isRead = true; // Mark as read
    await notification.save();

    // Update verification status in verifyAccount model (if needed)
    const verification = await verifyAccount.findOne({ userId: notification.userId });
    if (verification) {
      verification.status = status;
      await verification.save();
      console.log('Updated verification status:', verification.status); // Debugging line
    }
// Update the user's profileStatus
const user = await User.findById(notification.userId);
if (user) {
  user.profileStatus = status === 'approved' ? 'verified' : 'rejected';
  await user.save();
}
    // Emit real-time update to the user
    if (global.io) {
      global.io.emit('verification_update', {
        userId: notification.userId,
        status,
      });
    }

    res.json({ message: `Verification ${status} successfully!` });
  } catch (error) {
    console.error('Error updating verification status:', error);
    res.status(500).json({ message: 'Failed to update verification status.', error });
  }
});

// Export the router
module.exports = router;
