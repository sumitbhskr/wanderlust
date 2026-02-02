const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// Use environment variable or default to local
const MONGO_URL = process.env.MONGODB_URI || process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";

console.log("Connecting to MongoDB...");

main()
  .then(() => console.log("✅ Connected to DB"))
  .catch((err) => {
    console.log("❌ Connection failed:", err.message);
    process.exit(1);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  try {
    console.log("Clearing existing listings...");
    await Listing.deleteMany({});
    
    console.log("Inserting sample listings...");
    
    // Check if we need to add owner (optional for seeding)
    // If you have users, you can uncomment this and add a valid user ID
    // const sampleData = initData.data.map((obj) => ({
    //   ...obj,
    //   owner: "PASTE_A_VALID_USER_ID_HERE"
    // }));
    
    await Listing.insertMany(initData.data);
    
    console.log("✅ Database initialized successfully!");
    console.log(`   Added ${initData.data.length} listings`);
    
    mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error("❌ Error initializing database:", err.message);
    process.exit(1);
  }
};

initDB();
