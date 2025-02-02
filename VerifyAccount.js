const mongoose = require('mongoose');

const verifyAccountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  documentNumber: { type: String, required: true },
  issueDate: { type: Date, required: true },
  issuedFrom: { type: String, required: true },
  citizenshipImage: { type: String, required: true },

  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
});

const verifyAccount = mongoose.model('verifyAccount', verifyAccountSchema);

module.exports = verifyAccount;
