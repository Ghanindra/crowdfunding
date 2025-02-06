
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: function() {
      return !this.googleId; // Required only if googleId is not present
    },
    // unique:true,
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId; // Required only for local sign-up
    }
  },
  email: {
    type: String,
    required: true, // Required for both local and OAuth users
    unique: true,
   
  },
  googleId: {
    type: String,
    required: false // Optional, only for OAuth users
  },
  displayName: {
    type: String, // Optional field, typically for OAuth users
    required: false
  },
  role: {
    type: String,
    default: 'user'
  },
 
  otp:{
    type:Number,
    default:0,
  },
   profilePicture: {
     type: String, // Store the path to the uploaded photo
     default: '', // Default value if no photo is uploaded
   },
   secretKey:{
    type:String
   },
  //  isVerified: {
  //   type: Boolean,
  
  //   default: false,
  //    }, 
     // Inside your User schema
profileStatus: {
  type: String,
  enum: ['pending', 'verified', 'rejected'],
  default: 'pending',  // Default to 'pending' until verification is done
}, 
});

const User = mongoose.model('User', userSchema);

module.exports = User;
