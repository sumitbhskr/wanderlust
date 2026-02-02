# Wanderlust - Fixed for Vercel Deployment

## What Was Fixed

### 1. **MongoDB Connection Timeout Issue**
   - **Problem**: The app was using a local MongoDB URL (`mongodb://127.0.0.1:27017/wanderlust`) which doesn't work on Vercel
   - **Solution**: 
     - Created `api/index.js` for Vercel serverless deployment
     - Added environment variable support for MongoDB Atlas connection
     - Added proper timeout settings for serverless environment

### 2. **Missing Serverless Handler**
   - **Problem**: Vercel.json pointed to `api/index.js` but this file didn't exist
   - **Solution**: Created `api/index.js` that properly exports the Express app for Vercel

### 3. **MongoDB Connection Settings**
   - Added `serverSelectionTimeoutMS: 5000` - Reduces timeout from 30s to 5s
   - Added `socketTimeoutMS: 45000` - Closes inactive connections after 45s
   - Added connection state check to prevent multiple connections

## Deployment Steps

### Step 1: Set up MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist all IP addresses (0.0.0.0/0) for Vercel
5. Get your connection string (should look like):
   ```
   mongodb+srv://username:password@cluster.mongodb.net/wanderlust?retryWrites=true&w=majority
   ```

### Step 2: Deploy to Vercel
1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add Environment Variables:
   - `ATLASDB_URL` = Your MongoDB Atlas connection string
   - `SECRET` = A random secret string for sessions (e.g., `myverysecretkey123`)

### Step 3: Deploy
Click "Deploy" and wait for the build to complete!

## Environment Variables Required

Add these in Vercel Dashboard > Settings > Environment Variables:

- **ATLASDB_URL**: Your MongoDB Atlas connection string
- **SECRET**: Session secret key

## Testing Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file (use `.env.example` as template):
   ```env
   ATLASDB_URL=mongodb+srv://your-connection-string
   SECRET=your-secret-key
   ```

3. Install dotenv:
   ```bash
   npm install dotenv
   ```

4. Update `api/index.js` to load env vars locally:
   ```javascript
   require('dotenv').config();
   ```

5. Run the app:
   ```bash
   node api/index.js
   ```

## Key Changes Made

### File: `api/index.js` (NEW)
- Moved app.js logic here for Vercel serverless
- Added environment variable support
- Added MongoDB connection with proper timeouts
- Exported app as module

### File: `vercel.json` (UPDATED)
- Properly configured to use `api/index.js`
- Routes all requests to the serverless function

### File: `.env.example` (NEW)
- Template for required environment variables

## Troubleshooting

### Error: "Operation `users.findOne()` buffering timed out after 10000ms"
- **Cause**: MongoDB Atlas connection string not set or incorrect
- **Solution**: Double-check your `ATLASDB_URL` in Vercel environment variables

### Error: "MongooseServerSelectionError"
- **Cause**: Cannot connect to MongoDB Atlas
- **Solution**: 
  - Verify connection string is correct
  - Check that IP address 0.0.0.0/0 is whitelisted in MongoDB Atlas
  - Ensure database user credentials are correct

### Error: "Cannot find module"
- **Cause**: Missing dependencies
- **Solution**: Make sure all dependencies are in `package.json` and run `npm install`

## Notes

- The original `app.js` file is kept for reference but is not used in deployment
- All routes remain the same
- Session and authentication work the same way
- Static files and views are properly served from the `api/` folder context
