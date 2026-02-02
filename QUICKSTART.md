# Quick Start Guide - WanderLust on Vercel

## 🎯 30-Second Overview

Your WanderLust app is now ready for Vercel! The key change: it now uses `ATLASDB_URL` environment variable for MongoDB Atlas connection.

## 🚀 Quick Deploy (5 Minutes)

### What You Need
1. MongoDB Atlas connection string
2. Cloudinary credentials (Cloud Name, API Key, API Secret)
3. GitHub/GitLab/Bitbucket account
4. Vercel account

### Deploy Steps

1. **Push to Git**
   ```bash
   git add .
   git commit -m "Ready for Vercel"
   git push origin main
   ```

2. **Go to Vercel**
   - Visit https://vercel.com/dashboard
   - Click "New Project"
   - Import your repository

3. **Add Environment Variables** (Critical!)
   ```
   ATLASDB_URL=mongodb+srv://user:pass@cluster.mongodb.net/wanderlust
   CLOUD_NAME=your-cloud-name
   CLOUD_API_KEY=your-api-key
   CLOUD_API_SECRET=your-api-secret
   SESSION_SECRET=run: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Done! 🎉

## 📋 What Changed?

### app.js
```javascript
// OLD: Hardcoded local MongoDB
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// NEW: Uses environment variable with fallback
const MONGO_URL = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";
```

### package.json
```json
// Added start script
"scripts": {
  "start": "node app.js"
}
```

### New Files
- `vercel.json` - Vercel config
- `.env.example` - Environment template
- `README.md` - Documentation
- `DEPLOYMENT_GUIDE.md` - Detailed guide
- `DEPLOYMENT_CHECKLIST.md` - Checklist

## ✅ Everything Still Works Locally!

Your app works exactly the same locally:
- Without `ATLASDB_URL` → uses local MongoDB
- With `ATLASDB_URL` → uses MongoDB Atlas

## 📚 Need More Help?

- **Quick Checklist**: `DEPLOYMENT_CHECKLIST.md`
- **Detailed Guide**: `DEPLOYMENT_GUIDE.md`
- **Full Docs**: `README.md`
- **What Changed**: `CHANGELOG.md`

## 🔑 Key Points

1. **ATLASDB_URL** is the MongoDB Atlas connection string
2. Set **5 environment variables** in Vercel before deploying
3. Image uploads go to **Cloudinary** (not server filesystem)
4. **100% backward compatible** with local development

## ⚡ Common Issues

**"Can't connect to database"**
- Check ATLASDB_URL is correct
- Whitelist 0.0.0.0/0 in MongoDB Atlas

**"Image upload fails"**
- Verify Cloudinary credentials

**"Session not working"**
- Set SESSION_SECRET in Vercel

## 🎊 That's It!

Your app is production-ready. Deploy and enjoy!

Questions? Check `DEPLOYMENT_GUIDE.md` for detailed troubleshooting.
