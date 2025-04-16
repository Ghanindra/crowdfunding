const express = require("express");
const router = express.Router();
const Donation = require("../models/Payment"); // Make sure this path is correct

// Route to fetch all payment details for admin
router.get("/payments", async (req, res) => {
    try {
      const donations = await Donation.find().populate("userId")
      .populate("campaignId"); // only pull title of campaign
      ;
      res.status(200).json({ donations });
    } catch (error) {
      console.error("Error fetching payments:", error);
      res.status(500).json({ message: "Server error while fetching payments" });
    }
  });

module.exports = router;
