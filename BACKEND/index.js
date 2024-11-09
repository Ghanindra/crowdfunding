// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
require('dotenv').config();
const User=require('./models/user')

const app = express();
const PORT = process.env.PORT || 5000;
const session=require('express-session')
const passport=require('passport')
const OAuth2Strategy=require('passport-google-oauth2').Strategy;
const clientid='48022532682-0q1lqgus3bjdvbkurvkunbp8k6k7gf8v.apps.googleusercontent.com'
const clientsecret='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'

// Middleware
app.use(cors());
app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

// Use routes
app.use('/api', authRoutes);
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

//setup session
app.use(session({
  secret:'123abcd456bibash',
  resave:false,
  saveUninitialized:true
}))

//setup passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth2Strategy({ 
    clientID:clientid,
    clientSecret:clientsecret,
    callbackURL:'/auth/google/callback',
    scope:['profile','email']
  },
async(accessToken,refreshToken,profile,done)=>{
  console.log("profile",profile);
  
  try {
   let user=await User.findOne({googleId:profile.id});
   if(!user){
    const username = profile.displayName.replace(/\s+/g, '').toLowerCase() + Math.floor(Math.random() * 1000);
    user=new User({
      
      googleId:profile.id,
      displayName:profile.displayName,
      username:username,
      email:profile.emails[0].value,
      image:profile.photos[0].value
    })
    await user.save();
   }
   return done(null,user)
  } catch (error) {
    return done(error,null)
  }
}
)
)

passport.serializeUser((user,done)=>{
done(null,user);
})
passport.deserializeUser((user,done)=>{
  done(null,user);
})

//initial google oauth Login
app.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));

app.get("/auth/google/callback",passport.authenticate("google",{


  successRedirect:`http://localhost:5173/donordashboard`,
  failureRedirect:'http://localhost:5173/login'
}))
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
