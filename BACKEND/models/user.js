// // // // const mongoose = require('mongoose');

// // // // const UserSchema = new mongoose.Schema({
// // // //     username: { type: String, required: true, unique: true },
// // // //     password: { type: String, required: true },
// // // //     email:{type:String,required:true}
// // // // });

// // // // module.exports = mongoose.model('User', UserSchema);
// // // const mongoose = require('mongoose');
// // // const bcrypt = require('bcryptjs');

// // // const userSchema = new mongoose.Schema({
// // //   username: { type: String, required: true },
// // //   email: { type: String, required: true, unique: true },
// // //   password: { type: String, required: true },
// // //   role: { type: String, enum: ['donor', 'creator', 'admin'], required: true },
// // // });

// // // userSchema.pre('save', async function (next) {
// // //   if (!this.isModified('password')) return next();
// // //   this.password = await bcrypt.hash(this.password, 10);
// // //   next();
// // // });

// // // const User = mongoose.model('User', userSchema);
// // // module.exports = User;

// // // models/User.js
// // const mongoose = require('mongoose');

// // const userSchema = new mongoose.Schema({
// //   email: { type: String, required: true, unique: true },
// //   password: { type: String, required: true },
// //   role: { type: String, enum: ['donor', 'creator', 'admin'], required: true },
// // });

// // const User = mongoose.model('User', userSchema);

// // module.exports = User;
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, required: true },
//   username: { type: String, required: true , default: function() {
//     return this.displayName;
//   }},
//   googleId:String,
//   displayName:String,
//   image:String
// },{timestamps:true})

// const User = mongoose.model('User', userSchema);

// module.exports = User;

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
    unique: true
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
    default: 'donor'
  },
  image: {
    type: String,
    required: false
  },
  otp:{
    type:Number,
    default:0,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
