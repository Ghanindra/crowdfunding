const mongoose = require("mongoose")

const ContactSchema = new mongoose.Schema({
  userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",  // Assuming you're referencing the "User" collection
      required: false // Making it optional
    },
  name: {
    type: String,
    required: [true, "Please provide your name"],
    trim: true,
    maxlength: [100, "Name cannot be more than 100 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email"],
    trim: true,
  },
  subject: {
    type: String,
    required: [true, "Please provide a subject"],
    trim: true,
    maxlength: [200, "Subject cannot be more than 200 characters"],
  },
  message: {
    type: String,
    required: [true, "Please provide a message"],
    trim: true,
    maxlength: [2000, "Message cannot be more than 2000 characters"],
  },
  status: {
    type: String,
    enum: ["unread", "read", "responded"],
    default: "unread",
  },
  isRead: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Contact", ContactSchema)

