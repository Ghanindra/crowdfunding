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
  documentNumber: { type: String, required: true },
  username:{ type: String,required:true },
  issueDate: { type: String, required: true },
  issuedFrom: { type: String, required: true },
  citizenshipImage: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  isRead: { type: Boolean, default: false },
  type: { type: String, required: true }, // ✅ Add this field
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
