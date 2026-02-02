// Simple MongoDB Connection Test
// Run this locally to verify your connection string works

const mongoose = require('mongoose');

const MONGO_URL = "mongodb+srv://sumitbhaskar430_db_user:FeqAr87XgTkbOg@cluster0.twtjfjl.mongodb.net/wanderlust?retryWrites=true&w=majority";

console.log("Testing MongoDB connection...");
console.log("URL (masked):", MONGO_URL.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));

mongoose.connect(MONGO_URL, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
  .then(() => {
    console.log("✅ SUCCESS! MongoDB connection works!");
    console.log("Database:", mongoose.connection.name);
    console.log("Host:", mongoose.connection.host);
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ FAILED! Connection error:");
    console.error("Error name:", err.name);
    console.error("Error message:", err.message);
    
    if (err.message.includes("authentication")) {
      console.error("\n🔑 Authentication issue - Check username/password");
    } else if (err.message.includes("ENOTFOUND") || err.message.includes("getaddrinfo")) {
      console.error("\n🌐 Network issue - Check if cluster hostname is correct");
    } else if (err.message.includes("IP address")) {
      console.error("\n🚫 IP whitelist issue - Add 0.0.0.0/0 in MongoDB Atlas Network Access");
    }
    
    process.exit(1);
  });
