const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  campaignId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Campaign" 
  }, // Ensure "Campaign" matches the model name
  reason: {
    type: String,
    required: true,
  },
  reportedAt: {
    type: Date,
    default: Date.now,
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",  // Assuming you're referencing the "User" collection
    required: false // Making it optional
  }
});

module.exports = mongoose.model("Report", ReportSchema);
