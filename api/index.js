const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("../utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/user.js");

const listingsRouter = require("../routes/listing.js");
const reviewsRouter = require("../routes/review.js");
const userRouter = require("../routes/user.js");

// Use environment variable for MongoDB URL (Atlas) or fallback to local
// Supports both MONGODB_URI (common standard) and ATLASDB_URL
const MONGO_URL = process.env.MONGODB_URI || process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";

// Log for debugging (hide password)
const urlToLog = MONGO_URL.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@');
console.log("Attempting MongoDB connection to:", urlToLog);
console.log("Environment check - MONGODB_URI exists:", !!process.env.MONGODB_URI);
console.log("Environment check - ATLASDB_URL exists:", !!process.env.ATLASDB_URL);

// MongoDB connection with proper timeout settings for serverless
const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      console.log("Initiating MongoDB connection...");
      await mongoose.connect(MONGO_URL, {
        serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      });
      console.log("✅ Successfully connected to MongoDB");
    } else {
      console.log("MongoDB already connected");
    }
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    throw err;
  }
};

// Connect to database
connectDB();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "../public")));

const store = MongoStore.create({
  mongoUrl: MONGO_URL,
  crypto: {
    secret: process.env.SECRET || "mysupersecretcode",
  },
  touchAfter: 24 * 3600, // lazy session update (24 hours)
});

store.on("error", (err) => {
  console.log("SESSION STORE ERROR:", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET || "mysupersecretcode",
  resave: false,
  saveUninitialized: false, // Changed to false for better security
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    // For production (Vercel with HTTPS)
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  }
};

app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);

// 404 HANDLER 
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.log(err);
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

// Export for Vercel serverless
module.exports = app;
