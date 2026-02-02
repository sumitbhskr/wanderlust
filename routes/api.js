const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const initData = require("../init/data.js");

// SEED DATABASE ROUTE - Visit /api/seed to populate database
router.get("/seed", async (req, res) => {
  try {
    console.log("Starting database seed...");
    
    // Clear existing listings
    await Listing.deleteMany({});
    console.log("Cleared existing listings");
    
    // Insert sample data
    await Listing.insertMany(initData.data);
    console.log(`Inserted ${initData.data.length} listings`);
    
    res.json({
      success: true,
      message: `Database seeded successfully with ${initData.data.length} listings!`,
      count: initData.data.length
    });
  } catch (err) {
    console.error("Seed error:", err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

module.exports = router;
