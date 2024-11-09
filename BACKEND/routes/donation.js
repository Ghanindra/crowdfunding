// const express = require('express');
// const Donation = require('../models/donation');

// const router = express.Router();

// // Create a donation
// router.post('/', async (req, res) => {
//     const donation = new Donation(req.body);
//     await donation.save();
//     res.status(201).json(donation);
// });

// // Get donations for a campaign
// router.get('/:campaignId', async (req, res) => {
//     const donations = await Donation.find({ campaignId: req.params.campaignId });
//     res.json(donations);
// });

// module.exports = router;
