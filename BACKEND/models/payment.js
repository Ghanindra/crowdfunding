const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  fundraiserId: String,
  userId: String,
  amount: Number,
  tipAmount: Number,
  totalAmount: Number,
  paymentMethod: String,
  status: {
    type: String,
    required: true,
    enum: ["Pending", "Success", "FAILED", "REFUNDED"], // ✅ "Pending" added
    // default: "Pending", // ✅ Default set to "Pending"
  },
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Campaign",
    required: true,
  },
  product_id: {
    type: String,
    required: true,
  },
  transactionId: String,
  createdAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
