// const express = require("express");
// const multer = require("multer");
// const path = require("path");
// const campaignController = require("../controllers/campaigncontroller");


// const router = express.Router();

// // Set up multer storage for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // Ensure the "uploads" directory exists
//     cb(null, "uploads/"); // Store images in "uploads" folder
//   },
//   filename: (req, file, cb) => {
//     // Ensure unique filenames using timestamps and file extension
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });


// const fileFilter = (req, file, cb) => {
//     // Allow only image files (e.g., jpg, jpeg, png, gif)
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true); // Accept the file
//     } else {
//       cb(new Error('Only image files are allowed!'), false); // Reject non-image files
//     }
//   };

// const upload = multer({ storage: storage, fileFilter: fileFilter });

// // Create campaign route with file upload
// router.post("/", upload.single("image"), campaignController.createCampaign);


// module.exports = router;


const express = require("express");
const multer = require("multer");
const path = require("path");
const campaignController = require("../controllers/campaigncontroller");


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
router.post("/", upload.single("image"), campaignController.createCampaign);

module.exports = router;
