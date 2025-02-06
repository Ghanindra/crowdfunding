const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  placeName: { type: String, required: true },
  category: { type: String, required: true },
  beneficiary: { type: String, required: true },
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false }, // New field for notifications
});

const Campaign = mongoose.model("Campaign", campaignSchema);

module.exports = Campaign;
