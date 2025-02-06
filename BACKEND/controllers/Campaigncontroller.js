//  // Adjust the path according to your project structure
//  const Campaign = require("../models/campaign");
// const createCampaign = async(req, res) => {

//     try {
//       const { placeName, category, beneficiary, title, description, targetAmount } = req.body;
//       const image = req.file ? req.file.path : null; // Handle image if uploaded

  
      
//     // Check if all required fields are present
//     if (!placeName || !category || !beneficiary || !image || !title || !description || !targetAmount) {
//         return res.status(400).json({ message: 'All fields are required.' });
//       }

//       const newCampaign = new Campaign({  placeName, category, beneficiary, title, description, targetAmount, image,  });
  
  
//         // Save the campaign to the database
//     await newCampaign.save();
//     res.status(201).json({ message: 'Campaign created successfully', campaign: newCampaign });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error });
//   }
// };
//   module.exports = { createCampaign };
  
// Adjust the path according to your project structure
const Campaign = require("../models/campaign");
const verifyAccount = require("../models/VerifyAccount"); // Import verification model

const createCampaign = async (req, res) => {
  try {
    const { placeName, category, beneficiary, title, description, targetAmount } = req.body;
    const image = req.file ? req.file.path : null; // Handle image if uploaded

    // Ensure user is authenticated (req.user should be set by verifyToken middleware)
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized: User not authenticated.' });
    }

    // Check user's verification status
    const verification = await verifyAccount.findOne({ userId: req.user.id });

    if (!verification || verification.status !== 'approved') {
      return res.status(403).json({ message: 'Only verified users can create campaigns.' });
    }

    // Check if all required fields are present
    if (!placeName || !category || !beneficiary || !image || !title || !description || !targetAmount) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create new campaign
    const newCampaign = new Campaign({
      placeName,
      category,
      beneficiary,
      title,
      description,
      targetAmount,
      image,
      createdBy: req.user.id, // Store campaign creator ID
    });

    // Save campaign to database
    await newCampaign.save();
    res.status(201).json({ message: 'Campaign created successfully', campaign: newCampaign });

  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { createCampaign };
