// models/ActivityLog.js
const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  activityType: String, // e.g., 'donation', 'campaign_created', etc.
  description: String,
  createdAt: { type: Date, default: Date.now },
});

const ActivityLog = mongoose.model("ActivityLog", activitySchema);

module.exports = ActivityLog;