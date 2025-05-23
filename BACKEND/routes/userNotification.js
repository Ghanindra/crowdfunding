const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Notification = require("../models/Notification");

// Fetch unread notifications for a user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const notifications = await Notification.find({ userId, isRead: false });

    // Return the notifications
    res.json({ notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;

// const express = require("express");
// const mongoose = require("mongoose");
// const router = express.Router();
// const Notification = require("../models/Notification");

// // Fetch unread notifications for a user
// router.get('/:userId', async (req, res) => {
//   try {
//     const { userId } = req.params;
//     console.log("Received userId:", userId);

//     // Validate MongoDB ObjectId format
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ message: "Invalid user ID format" });
//     }

//     // Convert the userId to ObjectId
//     const objectId = new mongoose.Types.ObjectId(userId);
//     console.log("Converted ObjectId:", objectId);

//     // Find unread notifications for the user
//     const notifications = await Notification.find({ userId: objectId, isRead: false });

//     // Return the notifications
//     res.json({ notifications });
//   } catch (error) {
//     console.error('Error fetching notifications:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// module.exports = router;
