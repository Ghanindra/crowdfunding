// // models/Notification.js
// const mongoose = require('mongoose');

// const NotificationSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
//   message: { type: String, required: true },
//   isRead: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Notification', NotificationSchema);




const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   documentNumber: { type: String },
  username:{ type: String},
   issueDate: { type: String },
   issuedFrom: { type: String},
  citizenshipImage: { type: String},
  message: { type: String},
  type: { type: String, enum: ['campaign', 'verification','verification_result'], required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  isRead: { type: Boolean, default: false },
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: false }, // Allow campaignId
  
  // type: { type: String, required: true }, // ✅ Add this field
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
