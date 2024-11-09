// const express = require('express');
// const Campaign = require('../models/campaign');

// const router = express.Router();

// // Create a campaign
// router.post('/', async (req, res) => {
//     const campaign = new Campaign(req.body);
//     await campaign.save();
//     res.status(201).json(campaign);
// });

// // Get all campaigns
// router.get('/', async (req, res) => {
//     const campaigns = await Campaign.find();
//     res.json(campaigns);
// });

// // Update a campaign
// router.put('/:id', async (req, res) => {
//     const updatedCampaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedCampaign);
// });

// // Delete a campaign
// router.delete('/:id', async (req, res) => {
//     await Campaign.findByIdAndDelete(req.params.id);
//     res.status(204).send();
// });

// module.exports = router;
