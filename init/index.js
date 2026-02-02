// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listing.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// main()
//   .then(() => console.log("Connected to DB"))
//   .catch((err) => console.log(err));

// async function main() {
//   await mongoose.connect(MONGO_URL);
// }

// const initDB = async () => {
//   await Listing.deleteMany({});

//   initData.data = initData.data.map((obj) => ({
//     ...obj,
//     owner: "69256f6ce08fc941f41d59d2", // Make sure this user exists
//   }));

//   await Listing.insertMany(initData.data);
//   console.log("Data was initialized");

//   mongoose.connection.close(); // OPTIONAL but best practice
// };

// initDB();

import express from "express";
import mongoose from "mongoose";
import User from "../models/User.js";

const app = express();
app.use(express.json());

// 🔥 MongoDB connection cache (MOST IMPORTANT)
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI missing");
  }

  const db = await mongoose.connect(process.env.MONGODB_URI, {
    dbName: "wanderlust",
  });

  isConnected = db.connections[0].readyState;
  console.log("✅ MongoDB connected");
}

// TEST ROUTE
app.get("/", async (req, res) => {
  await connectDB();
  res.send("API working");
});

// SIGNUP EXAMPLE
app.post("/signup", async (req, res) => {
  try {
    await connectDB();

    const user = await User.findOne({ email: req.body.email });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default app;
