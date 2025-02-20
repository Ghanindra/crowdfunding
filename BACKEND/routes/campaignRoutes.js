

const express = require("express");
const multer = require("multer");
const path = require("path");
// // const campaignController = require("../controllers/campaigncontroller.js");
const { createCampaign } = require('../controllers/Campaigncontroller'); // Destructure the correct function


// const router = express.Router();

// // Set up multer storage for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Store images in the "uploads" folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Ensure unique filenames using timestamp
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true); // Accept image files
//   } else {
//     cb(new Error('Only image files are allowed!'), false); // Reject non-image files
//   }
// };

// const upload = multer({ storage: storage, fileFilter: fileFilter });

// // Create campaign route with file upload and authentication check
// router.post("/create", upload.single("image"), campaignController.createCampaign);
// console.log(campaignController.createCampaign); // Should log a function

// module.exports = router;


// const express = require('express');
const  createCampaigns  = require("../controllers/Campaigncontroller"); // Import the function
// const multer = require('multer');
// const path = require('path');
const router = express.Router();

// Set up multer storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store images in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Ensure unique filenames using timestamp
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accept image files
  } else {
    cb(new Error('Only image files are allowed!'), false); // Reject non-image files
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Create campaign route with file upload and authentication check
router.post("/", upload.single("image"), createCampaigns);

module.exports = router;
