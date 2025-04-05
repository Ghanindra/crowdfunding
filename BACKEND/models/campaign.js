// const mongoose = require("mongoose");

// const campaignSchema = new mongoose.Schema({
//   placeName: { type: String, required: true },
//   category: { type: String, required: true },
//   beneficiary: { type: String, required: true },
//   image: { type: String, required: true },
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   targetAmount: { type: Number, required: true },
//   raisedAmount: { type: Number, default: 0 },
//   status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
//   createdAt: { type: Date, default: Date.now },
//   isRead: { type: Boolean, default: false }, // New field for notifications
//   userId: { type: String, required: true },
//   startDate: { type: Date, required: true }, // New start date field
//   endDate: { type: Date, required: true },   // New end date field
// });

// const Campaign = mongoose.model("Campaign", campaignSchema);

// module.exports = Campaign;


const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  placeName: { type: String, required: true },
  category: { type: String, required: true },
  beneficiary: { type: String, required: true },
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  raisedAmount: { type: Number, default: 0 },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false }, // New field for notifications
  userId: { type: String, required: true },
  startDate: { type: Date, required: true }, // New start date field
  endDate: { type: Date, required: true },   // New end date field
});

// Virtual field for remaining days
campaignSchema.virtual('remainingDays').get(function() {
  const currentDate = new Date();
  const endDate = new Date(this.endDate);
  const differenceInTime = endDate - currentDate;
  const remainingDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)); // Convert time difference to days
  return remainingDays;
});

// Ensure virtuals are included in JSON output
campaignSchema.set('toJSON', {
  virtuals: true
});

const Campaign = mongoose.model("Campaign", campaignSchema);

module.exports = Campaign;
