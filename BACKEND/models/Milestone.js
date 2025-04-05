const mongoose = require("mongoose");

const milestoneSchema = new mongoose.Schema({
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  amountSpent: { type: Number, required: true },
  imageUrls: [{ type: String }], // if storing multiple image URLs
  createdAt: { type: Date, default: Date.now }
});

// Export the model properly
module.exports = mongoose.model("Milestone", milestoneSchema);
