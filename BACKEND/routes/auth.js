const mongoose = require('mongoose');
const moment = require('moment'); // Ensure you have the moment.js library installed
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const Campaign = require('../models/campaign');
const Milestone = require('../models/Milestone');
const Report = require('../models/Report');
const Payment = require('../models/Payment');
const Contact = require('../models/contact');
const Notification = require('../models/Notification');
const verifyAccount = require('../models/VerifyAccount');
const ActivityLog = require("../models/ActivityLog");


// const Profile = require('../models/profile');
const router = express.Router();
const multer = require('multer');
const nodemailer=require('nodemailer');
const authenticate = require('../middleware/authenticate'); // Path to your auth middleware
const { Verification_Email_Template } = require('../libs/EmailTemplate.jsx');
const { io } = require('../index'); // Ensure io is imported from server.js



router.post('/signup', async (req, res) => {
  const { username, email, password, role ,secretKey} = req.body;
console.log('check',req.body);

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
    const { username,email,password } = req.body;
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
  
    // ✅ Check if user is blocked
    if (user.blocked) {
      return res.status(403).json({ message: "Your account has been blocked.Please contact through contact page" });
    }

    // ✅ Check if user is deactivated/inactive
    if (user.status === "inactive") {
      return res.status(403).json({ message: "Your account is deactivated." });
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
      

      console.log('role',user.role);
     return res.json({ token, user: { username: user.username,user_id:user.id, email: user.email, role: user.role },
     
      
      
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




router.post('/campaigns', authenticate, upload.single('image'), async (req, res) => {
  try {
    const userId = req.user.id; // Get userId from decoded token
    console.log('user', userId);

    // Code to create a campaign
    const { placeName, category, beneficiary, title, description, targetAmount } = req.body;
    console.log('submit', req.body);

    const image = req.file ? req.file.path : null;

    if (!placeName || !category || !beneficiary || !image || !title || !description || !targetAmount) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const currentDate = moment().startOf('day').format('YYYY-MM-DD'); // Set current date to start of the day
    const endDate = moment(req.body.endDate).startOf('day').format('YYYY-MM-DD'); // Ensure endDate is in YYYY-MM-DD format

    // Ensure that endDate is not less than currentDate (start date)
    if (moment(endDate).isBefore(moment(currentDate))) {
      return res.status(400).json({ message: 'End date cannot be earlier than the start date.' });
    }

    // Ensure endDate is not more than 6 months from the start date
    const maxEndDate = moment(currentDate).add(6, 'months');
    if (moment(endDate).isAfter(maxEndDate)) {
      return res.status(400).json({ message: 'End date cannot be more than 6 months from the start date.' });
    }

    // Calculate remaining days until the end date
    const remainingDays = moment(endDate).diff(moment(currentDate), 'days');
    console.log('Remaining days:', remainingDays);

    const newCampaign = new Campaign({
      placeName,
      category,
      beneficiary,
      title,
      description,
      targetAmount,
      raisedAmount: 0, // Set to zero initially
      image,
      status: 'pending', // Set the initial status to 'pending'
      userId: userId,
      startDate: currentDate, // Set start date to current date
      endDate: endDate, // Set end date from user input
      remainingDays: remainingDays // Add remaining days to campaign
    });

    await newCampaign.save();

    // Send notification if campaign is approaching its end (e.g., within 2 days)
    if (remainingDays <= 2) {
      const notification = new Notification({
        message: `Campaign '${title}' is approaching its end in ${remainingDays} days.`,
        type: 'campaign',
        campaignId: newCampaign._id,
        userId: userId
      });

      await notification.save();
    }

    res.status(201).json({ 
      message: 'Campaign created successfully', 
      campaignId: newCampaign._id, 
      campaign: newCampaign,
      remainingDays: remainingDays 
    });

    // Check if there are any campaigns whose endDate has passed and remove them
    await Campaign.deleteMany({ endDate: { $lt: currentDate } });

  } catch (err) {
    res.status(500).json({ error: 'Failed to create campaign', details: err.message });
  }
});

router.get('/campaigns',async (req, res) => {
  try {
   
    const campaigns = await Campaign.find({ status: 'pending' });
    res.status(200).json({ message: 'Campaign created successfully', data: campaigns});

  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
});
router.get("/campaigns/:id", async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    console.log('campaign by id',campaign);
    
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
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
// Route to get campaigns by category
router.get('/category/:category',async (req, res) => {
  const { category } = req.params;
  console.log("Category received:", category);  // Debugging line
  
  try {
    const campaigns = await Campaign.find({ category:category });
    res.status(200).json(campaigns); // Return the data, not a message


  } catch (error) {
    res.status(500).send('Server Error');
  }
});
// Update raised amount after successful payment
router.post("/update-raised-amount", async (req, res) => {
  const { campaignId } = req.body;

  if (!campaignId) {
    return res.status(400).json({ error: "Campaign ID is required" });
  }
  const campaignObjectId =new mongoose.Types.ObjectId(campaignId);
  try {
    // Calculate total raised amount from successful payments
    const totalRaised = await Payment.aggregate([
      { $match: { campaignId:campaignObjectId, status: "Success" } }, // Filter successful payments
      { $group: { _id: null, total: { $sum: "$amount" } } }, // Sum the donations
    ]);

    const raisedAmount = totalRaised.length > 0 ? totalRaised[0].total : 0;
     // Fetch campaign to get the total amount
     const campaign = await Campaign.findById(campaignId);

     if (!campaign) {
       return res.status(404).json({ success: false, message: "Campaign not found" });
     }

    // Update the campaign with the new raised amount
    const updatedCampaign = await Campaign.findOneAndUpdate(
      { _id: campaignId },
      { raisedAmount },
      { new: true }
    );
    console.log('updated campaign',updatedCampaign);
     // Check if raisedAmount matches the totalAmount
     if (updatedCampaign.raisedAmount >= updatedCampaign.targetAmount) {
      // If raised amount equals or exceeds the total amount, delete the campaign
      await Campaign.findByIdAndDelete(campaignId);
      return res.json({ success: true, message: "Campaign completed and removed" });
    }

    res.json({ success: true, updatedCampaign });
  } catch (error) {
    console.error("Error updating raised amount:", error);
    res.status(500).json({ error: "Server error" });
  }
});
// Fetch raised amount for a specific campaign
router.get("/get-raised-amount/:campaignId", async (req, res) => {
  try {
    const { campaignId } = req.params;

    // Fetch campaign by ID
    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      return res.status(404).json({ success: false, message: "Campaign not found" });
    }

    res.json({ success: true, raisedAmount: campaign.raisedAmount });
  } catch (error) {
    console.error("Error fetching raised amount:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/search", async (req, res) => {
  console.log("Search route hit"); // Debugging log

  try {
    const query = req.query.query; // Get query parameter
    console.log("Received search query:", query); // Debug log

    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    // Search in MongoDB using regex (case-insensitive)
    const campaigns = await Campaign.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { placeName: { $regex: query, $options: "i" } },
      ],
    });

    console.log("Matching Campaigns:", campaigns);
    res.json(campaigns);
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// In your backend API (Express.js or similar)
router.delete('/campaigns/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Delete the campaign from the database
    const deletedCampaign = await Campaign.findByIdAndDelete(id);
    if (!deletedCampaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    res.status(200).json({ message: "Campaign deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting campaign" });
  }
});

// Fetch unread notification count
router.get('/notifications/count', async (req, res) => {
  try {
    // Count notifications where isRead is false and type is either 'verification' or 'report'
    const count = await Notification.countDocuments({
      isRead: false,
      type: { $in: ['verification','campaign' ,'contact','report'] }, // Matches both types
    });

    res.json({ count });
  } catch (error) {
    console.error('Error fetching notification count:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

//   try {
//     const count = await Notification.countDocuments({ isRead: false });
//     res.json({ count });
//   } catch (error) {
//     console.error('Error fetching notification count:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });
// Mark notifications as read
// router.put('/notifications/mark-as-read', async (req, res) => {
//   try {
//     await Notification.updateMany({ isRead: false }, { isRead: true });
//     res.json({ message: 'Notifications marked as read' });
//   } catch (error) {
//     console.error('Error updating notifications:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });



router.put('/notifications/mark-as-read/:id', async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Received Notification ID:", id); // Debugging
    await Notification.findByIdAndUpdate(id, { isRead: true });
    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error('Error updating notification:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.get('/user-notifications/count/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Received userId:", userId); // ✅ Log the userId
    console.log("Type of userId:", typeof userId);

    // Check if the userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId format' });
    }

    // Use the ObjectId constructor correctly
    const objectId = new mongoose.Types.ObjectId(userId);  // Ensure 'new' is used
// Debugging: Log the objectId
console.log("Converted ObjectId:", objectId);
    // Use the find method with an object filter
    const unreadNotificationsCount = await Notification.find({
      userId: objectId, // Use the ObjectId in the query
      isRead: false,
      type: { $in: ['verification_result', 'report_deleted','Warning'] }
    }).lean();

    console.log("Find result:", unreadNotificationsCount);

    const count = unreadNotificationsCount.length > 0 ? unreadNotificationsCount.length : 0;
    res.json({ count });
  } catch (error) {
    console.error("Error fetching user notifications count:", error);
    res.status(500).json({ message: 'Failed to fetch notifications count.' });
  }
});

// Route to mark a notification as read
router.put('/user-notifications/read/:notificationId', async (req, res) => {
  try {
    const { notificationId } = req.params;

    console.log('receive',notificationId );
    // Find the notification and mark it as read
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found.' });
    }

    // Mark as read if not already read
    if (!notification.isRead) {
      notification.isRead = true;
      await notification.save();
    }

    // After marking as read, send a success response
    res.json({ message: 'Notification marked as read.' });

    // Optionally, you can return the updated unread notifications count here if needed.
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ message: 'Failed to mark notification as read.' });
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

  // message: `Verification status updated to ${status}`,  // Add the message field here
  username: req.user.username, // Add username here
  citizenshipImage: verification.citizenshipImage,
  status: 'pending', // Initially pending
  isRead: false,
  type: 'verification', // ✅ Add this field to prevent validation error
});

console.log(notification)
await notification.save();
 

    res.status(201).json({ message: 'Verification submitted successfully and admin notified in real-time.' });
  } catch (error) {
    console.error('Error during verification submission:', error);
    res.status(500).json({ message: 'Verification submission failed.', error });
  }
});
// route to fetch the user's verification status
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

// Update verification

// Route to update verification details
router.post('/update_verification', authenticate, upload.single('citizenshipImage'), async (req, res) => {
  const { documentNumber, issueDate, issuedFrom } = req.body;
  console.log('Uploaded File:', req.file);

  if (!documentNumber || !issueDate || !issuedFrom) {
    return res.status(400).json({ message: 'Required fields are missing.' });
  }

  try {
    const verification = await verifyAccount.findOne({ userId: req.user.id });
    if (!verification) {
      return res.status(404).json({ message: 'Verification record not found.' });
    }

    // Update fields
    verification.documentNumber = documentNumber;
    verification.issueDate = issueDate;
    verification.issuedFrom = issuedFrom;
    if (req.file) {
      verification.citizenshipImage = `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`;
    }
    verification.status = 'pending'; // Reset status to pending after update

    await verification.save();
    console.log('Verification Updated:', verification);

    // Send notification to admin
    const notification = new Notification({
      userId: req.user.id,
      documentNumber,
      issueDate,
      issuedFrom,

      // message: `Verification status updated to ${status}`,  // Add the message field here
      username: req.user.username,
      citizenshipImage: verification.citizenshipImage,
      status: 'pending', // Mark as pending again
      isRead: false,
      type: 'verification',
    });

    await notification.save();
    console.log('Notification Sent:', notification);

   
    res.status(200).json({ message: 'Verification updated successfully and admin notified.' });
  } catch (error) {
    console.error('Error updating verification:', error);
    res.status(500).json({ message: 'Failed to update verification.', error });
  }
});

router.get('/admin/notifications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log("ID received:", id);
        // Validate ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ message: "Invalid ID format" });
        }  // Debug log
    const notification = await Notification.findById(id); // Fetch a single notification by ID
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found.' });
    }
    res.status(200).json(notification); // Send the notification object
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notification.', error });
  }
});
router.get('/admin/notifications', async (req, res) => {
  try {
    // Fetch only pending notifications
    const notifications = await Notification.find({ status: 'pending',   type: { $in: ['verification', 'contact','campaign','report'] },}) // Fetch both types }); // Only get pending notifications
    res.status(200).json(notifications); // Send the list of pending notifications
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

   
    // Handle different notification types
    if (notification.type === 'verification') {
      // Update verification status in verifyAccount model
      const verification = await verifyAccount.findOne({ userId: notification.userId });
      if (verification) {
        verification.status = status;
        await verification.save();
      }
    }
// Update the user's profileStatus
const user = await User.findById(notification.userId);
if (user) {
  user.profileStatus = status === 'approved' ? 'verified' : 'rejected';
  await user.save();
}

  // Handle report-specific actions if the notification type is 'report'
  if (notification.type === 'report') {
    const report = await Report.findById(notification.reportId); // Assuming you have a reportId field in Notification
    if (report) {
      report.status=status;
      await Report.save();
      return res.json({
        message: 'Notification read successfully!',
        reportDetails: report, // Include report details in the response to be shown in the UI
      });
    } else {
      return res.status(404).json({ message: 'Report not found' });
    }
  }
  if (notification.type === 'contact') {
    const contact = await Contact.findById(notification.contactId); // Assuming you have a reportId field in Notification
    if (contact) {
      contact.status=status;
      await Report.save();
      return res.json({
        message: 'Notification read successfully!',
        contactDetails: contact, // Include report details in the response to be shown in the UI
      });
    } else {
      return res.status(404).json({ message: 'Report not found' });
    }
  }
    // Store a new notification for the user about the decision
    const userNotification = new Notification({
      userId: notification.userId,
      message: `Your verification request has been ${status}.`,
      status,
      isRead: false,
  
      type: 'verification_result',
    });

    await userNotification.save();


    res.json({ message: `Verification ${status} successfully!` });
  } catch (error) {
    console.error('Error updating verification status:', error);
    res.status(500).json({ message: 'Failed to update verification status.', error });
  }
});
//fetch profile picture for navbar
router.get("/user/profile/:userId", async (req, res) => {
  try {
      const user = await User.findById(req.params.userId);
      res.json({ profilePicture: user.profilePicture });
  } catch (error) {
      res.status(500).json({ error: "Error fetching profile picture" });
  }
});

// Endpoint to get user details (userId, etc.)
router.get("/user/:id",authenticate, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: "Invalid user data" });
    }
    const user = await User.findById(req.user.id).select("_id username email"); // Fetch user data
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ userId: user._id,username: user.username, email: user.email }); // Send userId
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// Endpoint to get user details (userId, etc.)
router.get("/user",authenticate, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: "Invalid user data" });
    }
    const user = await User.findById(req.user.id).select("_id username email"); // Fetch user data
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ userId: user._id,username: user.username, email: user.email }); // Send userId
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/dashboard", async (req, res) => {
  try {
    const totalCampaigns = await Campaign.countDocuments();
    

    const totalUsers = await User.countDocuments();
    const totalDonations = await Payment.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]);
    const platformRevenue = await Payment.aggregate([
      { $group: { _id: null, revenue: { $sum: { $multiply: ["$amount", 0.05] } } } } // Assuming 5% platform fee
    ]);
    const recentActivity = await Payment.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('userId', 'username') // Populate the username from User
    .populate('campaignId', 'title') // Populate the title from Campaign
    .select('userId amount campaignId createdAt'); // Select necessary fields
  
  // Format the response for recent activity
  const responseData = {
    totalCampaigns,
    totalUsers,
    totalDonations: totalDonations[0]?.total || 0,
    platformRevenue: platformRevenue[0]?.revenue || 0,
    recentActivity: recentActivity.map(d => ({
      message: `${d.userId.username} donated ${d.amount} to ${d.campaignId.title}  `,
      createdAt: d.createdAt // Optionally, include the creation time in the message
    }))
  };
  

    console.log("Dashboard Response Data:", responseData); // Log the response data before sending
    res.json(responseData);

  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// Get user's campaigns and total raised amount
router.get("/user-dashboard/campaigns/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // Get all campaigns created by the user
    const campaigns = await Campaign.find({ userId: userId });

    const campaignDetails = await Promise.all(
      campaigns.map(async (campaign) => {
        // Calculate total raised amount for each campaign
        const totalRaised = await Payment.aggregate([
          { $match: { campaignId: campaign._id, status: "Success" } },
          { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);
        const raisedAmount = totalRaised.length > 0 ? totalRaised[0].total : 0;

        return {
          ...campaign.toObject(),
          raisedAmount,
        };
      })
    );

    // Send response with campaign details
    res.json({ success: true, campaigns: campaignDetails });
    console.log('user campaigns',campaigns);
    
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get the total donation amount made by the user


router.get("/user-dashboard/donations/:userId", async (req, res) => {
  const { userId } = req.params;
console.log('userId',req.params);
console.log("Full req.url:", req.url);

  try {
 

    // Find payments (donations) made by the user
    const donations = await Payment.find({ userId: String(userId), status: "Success" });
    console.log("Donations:", donations); // Debugging log

    // Calculate total donation amount
    const totalDonation = donations.reduce((sum, payment) => sum + Number(payment.amount), 0);

    // Send response
    res.json({ success: true, totalDonation });
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({ error: "Server error" });
  }
});
// API to submit a report
router.post("/report-campaign/:reportId", authenticate,async (req, res) => {
  try {
    const { campaignId, reason } = req.body;
const userId=req.user.id
    if (!campaignId || !reason) {
      return res.status(400).json({ success: false, message: "Campaign ID and reason are required." });
    }

    const newReport = new Report({ campaignId, reason ,userId});
    await newReport.save();
 // Check if the authenticated user is an admin
//  if (req.user.role === 'admin') {
  // Create a notification for the admin only
  const newNotification = new Notification({
    // userId: req.user.id,
    reportId:newReport._id, //  Use the newly created report's ID 
    message: `A new campaign has been reported. Reason: ${reason}`,
    type: "report",
    status: "pending",
    isRead: false,
  }
);

await newNotification.save();
//  }
 console.log('user role',req.user.role);
 
    res.status(201).json({ success: true, message: "Report submitted successfully." });
  } catch (error) {
    console.error("Error submitting report:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});
router.get("/reports-campaign/:reportId", async (req, res) => {
  try {
    const { reportId } = req.params;
    console.log("Requested Report ID:", reportId);
    const report = await Report.findById(reportId).populate("campaignId") .populate("userId");  ; // Assuming you are populating related campaign info
    const reportedCampaignIds = [report.campaignId.toString()]; // Since you expect a single report, we wrap it in an array
    if (!report) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }
    res.json(report|| reportedCampaignIds);
  } catch (error) {
    console.error("Error fetching report:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});
router.get("/reports-campaign", async (req, res) => {
  try {
    console.log("Fetching all reports with associated campaign information.");

    // Fetching all reports and populating the related campaign information
    ;
    const reports = await Report.find()
    .populate("campaignId")   // gets full campaign details

  
    // Log the reports to see the actual data
    console.log("Reports:", reports);

    // If no reports found
    if (reports.length === 0) {
      return res.status(404).json({ success: false, message: "No reports found" });
    }

    // Extracting the campaign IDs from each report
    const reportedCampaignIds = reports.map(report => {
      if (report.campaignId) {
        console.log("Campaign ID:", report.campaignId);  // Log campaignId for debugging
        return report.campaignId;
      } else {
        console.log("No campaignId found for report:", report._id);
        return null;
      }
    }).filter(campaignId => campaignId !== null);  // Removing null values

    // Respond with the reports and campaign IDs
    res.json({ reports, reportedCampaignIds });
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});



// / Route to send warning for a report
router.post('/reports-campaign/:id/warning', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    // Find the report by ID
    const report = await Report.findById(id).populate('campaignId');
    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    // Mark report as warned
    report.warning = true;
    await report.save();

    // Send a notification to the campaign owner
    const user = await User.findById(report.campaignId.userId);
    if (user) {
      const notification = new Notification({
        userId: user._id,
        type: 'Warning',
        message: `Your campaign "${report.campaignId.title}" has received a warning.`,
        isRead: false,
      });
      await notification.save();
    }

    res.json({ success: true, message: 'Warning sent successfully and notification added.' });
  } catch (error) {
    console.error('Error sending warning:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE route to delete a report, related data, and campaign
router.delete("/reports-campaign/:reportId", authenticate,async (req, res) => {
  try {
    const { reportId } = req.params;

    // Find and delete the report from the Report collection
    const report = await Report.findByIdAndDelete(reportId);

    if (!report) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }

    // Find and delete the associated campaign
    const campaign = await Campaign.findById(report.campaignId); // Assuming the report has a reference to the campaign
    if (campaign) {
      await Campaign.findByIdAndDelete(campaign._id);
    }

    // Delete any notifications related to the report
    await Notification.deleteMany({ reportId });

    // Send notification to the user (if `userId` exists)
    if (report.userId) {
      const user = await User.findById(report.userId);
      if (user) {
        const notification = new Notification({
          userId: req.user.id, // Corrected: Use `user._id`, not `notification.userId`
          type: "report_deleted",
          message: `Your report regarding the campaign "${campaign?.title || "Unknown"}" has been deleted by the admin.`,
          isRead: false,
        });
        await notification.save();
      }
    }

    res.json({ success: true, message: "Report, campaign, and related data deleted successfully" });
  } catch (error) {
    console.error("Error deleting report, campaign, or notifications:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
// // Express backend example
router.post(
  "/campaigns/:campaignId/milestones",
  upload.array("images"),
  async (req, res) => {
    try {
      console.log("Request body:", req.body);
      console.log("Uploaded files:", req.files);

      const { campaignId } = req.params;
      const { title, description, amountSpent } = req.body;

      if (!title || !description || !amountSpent) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Map uploaded files to their paths
      const imageUrls = req.files.map((file) => file.path);

      const milestone = new Milestone({
        campaignId,
        title,
        description,
        amountSpent: Number(amountSpent),
        imageUrls,
        createdAt: new Date(),
      });

      await milestone.save();

      return res
        .status(201)
        .json({ message: "Milestone added successfully", milestone });
    } catch (error) {
      console.error("Error adding milestone:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);


router.get("/milestones/:campaignId", async (req, res) => {
  try {
    const { campaignId } = req.params;
    const milestones = await Milestone.find({ campaignId });
    res.json({ success: true, milestones });
  } catch (error) {
    console.error("Error fetching milestones:", error);
    res.status(500).json({ success: false, message: "Error fetching milestones" });
  }
});
// Route to handle contact form submission
router.post('/contact',authenticate, async (req, res) => {
  const { name, email, subject, message } = req.body;
  const userId=req.user.id
  try {
    // Save the contact form submission to the Contact model
    const newContact = new Contact({ userId,name, email, subject, message });
    await newContact.save();
    const isRead = false; // Default to false
    // Create a detailed notification for the admin with full contact details
    const newNotification = new Notification({
      username: req.user.username, 
      userId,
      contactId:newContact._id,
      type:"contact",
      name,
      email,
      subject,
      message,
      isRead,
    });
    await newNotification.save();

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully.',
    });
  } catch (error) {
    console.error('Error saving contact form and notification:', error);
    res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' });
  }
});
// Route to get all contact submissions (for admin)
router.get('/contact-submissions/:id', async (req, res) => {
  try {
    const submissions = await Contact.find().sort({ createdAt: -1 }); // Sort by most recent
    res.status(200).json({ success: true, submissions });
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch contact submissions.' });
  }
});

//

// POST request to update like (either add or remove like)
router.post("/updateLike", authenticate, async (req, res) => {
  const { campaignId } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    const campaign = await Campaign.findById(campaignId);

    if (!user || !campaign) {
      return res.status(404).json({ message: "User or Campaign not found" });
    }

    const hasLiked = user.likedCampaigns.includes(campaignId);

    if (hasLiked) {
      user.likedCampaigns = user.likedCampaigns.filter(id => id.toString() !== campaignId.toString());
      campaign.likeCount = Math.max(0, campaign.likeCount - 1); // prevent negative likeCount
    } else {
      user.likedCampaigns.push(campaignId);
      campaign.likeCount += 1;
    }

    await user.save();
    await campaign.save();

    return res.status(200).json({
      message: hasLiked ? "Like removed" : "Like added",
      updatedLikeCount: campaign.likeCount,
      liked: !hasLiked,
    });

  } catch (error) {
    console.error("Like update error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// GET: Fetch all campaigns sorted by like count (descending)
router.get("/like/campaigns", async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ likeCount: -1 }); // 🔝 Most liked first
    res.status(200).json({ data: campaigns });
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    res.status(500).json({ message: "Server error" });
  }
});



// Get payment history of logged-in user
router.get('/my-payments', authenticate, async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user.id })
      .populate('campaignId', 'title') // get campaign title
      .sort({ paymentDate: -1 });

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payment history' });
  }
});
// Route to fetch all users (this should match the frontend request)
router.get("/admins/users", async (req, res) => {
  try {
    const users = await User.find({role:"user"}); // Fetch all users from the database
    res.status(200).json(users); // Send the users list as a response
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" }); // Handle errors
  }
})
router.patch("/admins/users/:id/status", async (req, res) => {
  const { status } = req.body;
  console.log("Requested status update:", status)

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      console.log("User not found")
      return res.status(404).json({ message: "User not found" });
    }

    user.status = status;
    const savedUser = await user.save();
    console.log("Saved user:", savedUser)

    res.status(200).json({ message: `User status updated to ${status}` });
  } catch (error) {
    console.error("Error while updating status:", error)
    res.status(500).json({ message: "Error updating user status" });
  }
});


router.patch("/admins/users/:id/block", (req, res) => {
  console.log("Block route hit for user:", req.params.id);
  const userId = req.params.id;

  // Find the user and update the blocked status along with the status field
  User.findByIdAndUpdate(userId, { 
    blocked: true, 
    status: "blocked"  // Updating the status field to "blocked"
  }, { new: true })
    .then(updatedUser => {
      // Respond with the updated user info
      res.json({ message: "User blocked successfully", user: updatedUser });
    })
    .catch(err => {
      res.status(500).json({ message: "Error blocking user", error: err });
    });
});



// Delete User
router.delete("/admins/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

// Track User Activity
router.get("/admins/user-activity", async (req, res) => {
  try {
    const activityLogs = await ActivityLog.find().populate("userId");
    res.status(200).json({ activityLogs });
  } catch (error) {
    res.status(500).json({ message: "Error fetching activity logs" });
  }
});
// Unblock a user
router.patch("/admins/users/:id/unblock", async (req, res) => {
  const userId = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { blocked: false },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User unblocked successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Error unblocking user", error: err });
  }
});


module.exports = router;
