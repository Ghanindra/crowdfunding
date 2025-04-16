

// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const userNotification = require("./routes/userNotification");
const campaignRoutes = require("./routes/campaignRoutes");  // Correctly import the campaign routes
const authenticate = require("./middleware/authenticate");
const adminRoutes = require("./routes/Adminroutes");
require('dotenv').config();

// Load env vars
// const errorHandler = require("./middleware/error")
const User = require('./models/user');
const { initSocket } = require('./socket');
const http = require('http');
// const contactRoutes = require("./routes/contactRoutes")
const { Server } = require('socket.io');
const path = require('path');
// const notificationRoutes = require("./routes/notificationRoutes")
const { EsewaInitiatePayment, paymentStatus } = require("./controllers/esewaController");


const app = express();
const server = http.createServer(app);

initSocket(server);

// Initialize Socket.io AFTER the server is created
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Adjust frontend URL if needed
    methods: ["GET", "POST"]
  }
});

// Store `io` globally (if needed in routes)
global.io = io;

// Handle WebSocket connection
io.on('connection', (socket) => {
  console.log('A client connected:', socket.id);

  // Listen for disconnection
  socket.on('disconnect', () => {
    console.log('A client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
const session = require('express-session');
const passport = require('passport');
const OAuth2Strategy = require('passport-google-oauth2').Strategy;
const clientid = '48022532682-0q1lqgus3bjdvbkurvkunbp8k6k7gf8v.apps.googleusercontent.com';
const clientsecret = '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';

// Middleware
app.use(cors());

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173',

  methods: ['GET', 'POST', 'PATCH', 'OPTIONS', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
// Error handler middleware
// app.use(errorHandler)
// Handle OPTIONS preflight requests (if not already handled)
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies
app.use('/uploads', express.static('uploads'));
// app.use("/api/contact", contactRoutes)
// app.use("/api/notifications", notificationRoutes)
// Use routes
app.use('/api', authRoutes);
app.use('/api/user-notifications', userNotification);
app.use("/api/campaigns", campaignRoutes);  // Ensure this is properly used
app.use("/api/admin", adminRoutes);
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Setup session
app.use(session({
  secret: '123abcd456bibash',
  resave: false,
  saveUninitialized: true
}));

// Setup passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth2Strategy({
    clientID: clientid,
    clientSecret: clientsecret,
    callbackURL: '/auth/google/callback',
    scope: ['profile', 'email']
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log("profile", profile);

    try {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        const username = profile.displayName.replace(/\s+/g, '').toLowerCase() + Math.floor(Math.random() * 1000);
        user = new User({
          googleId: profile.id,
          displayName: profile.displayName,
          username: username,
          email: profile.emails[0].value,
          image: profile.photos[0].value
        });
        await user.save();
      }
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Initial Google OAuth Login
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get("/auth/google/callback", passport.authenticate("google", {
  successRedirect: `http://localhost:5173/fundraiser`,
  failureRedirect: 'http://localhost:5173/login'
}));

// Routes
app.post("/initiate-payment",authenticate, EsewaInitiatePayment);
console.log(EsewaInitiatePayment); // should be a function

app.post("/payment-status", paymentStatus);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
