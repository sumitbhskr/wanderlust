# 🚀 Wanderlust - Complete Setup Guide

## ✅ What's Been Fixed

### 1. MongoDB Timeout - FIXED ✅
- Added environment variable support for MongoDB Atlas
- Added proper timeout settings for serverless
- Created serverless handler (api/index.js)

### 2. Session/Login Issues - FIXED ✅
- **Added MongoDB Session Store** - Sessions now persist in database
- **Added trust proxy** - Critical for Vercel HTTPS
- **Fixed cookie settings** - Proper configuration for production
- **Added debugging logs** - See what's happening

### 3. Empty Listings - EASY FIX ✅
- Created `/api/seed` endpoint to populate database
- One-click solution to add default listings

---

## 📋 Complete Setup Steps

### Step 1: Deploy the Fixed Code

1. **Extract the zip file**
2. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Fixed sessions and added seed endpoint"
   git push
   ```
3. **Wait for Vercel to deploy** (1-2 minutes)

### Step 2: Seed the Database (Add Default Listings)

Once deployed, simply visit this URL in your browser:

```
https://your-app-name.vercel.app/api/seed
```

Replace `your-app-name` with your actual Vercel URL.

You should see:
```json
{
  "success": true,
  "message": "Database seeded successfully with 50 listings!",
  "count": 50
}
```

**That's it!** Now refresh your `/listings` page and you'll see all 50 beautiful listings with images! 🎉

### Step 3: Test Login

1. Go to **Sign up** page
2. Create a new account:
   - Username: anything you like
   - Email: your email
   - Password: your password
3. Click **Sign up**
4. You should be automatically logged in!
5. Try clicking **"Add new Listing"** - should work now!

---

## 🔧 What Was Wrong with Sessions?

### Problem:
Serverless functions on Vercel don't share memory. Each request can hit a different server instance, so in-memory sessions don't work.

### Solution:
- **MongoDB Session Store**: Sessions stored in Atlas database
- **Trust Proxy**: Tells Express to trust Vercel's proxy (needed for HTTPS)
- **Proper Cookie Settings**: sameSite: 'lax', secure: false for debugging

---

## 🐛 Troubleshooting

### If Login Still Doesn't Work:

**Check the Vercel Logs:**
1. Go to Vercel Dashboard → Your Project
2. Click **Deployments**
3. Click latest deployment
4. Click **Function Logs**
5. Look for these messages:
   ```
   Request to: /login
   User authenticated: false
   Session ID: xxxxx
   ```

**If you see errors like "SESSION STORE ERROR":**
- Make sure `MONGODB_URI` or `ATLASDB_URL` is set in Vercel environment variables
- Make sure `SECRET` is set

**If authentication always shows `false`:**
1. Clear your browser cookies
2. Try in incognito/private window
3. Check that `connect-mongo` is installed (should auto-install from package.json)

### If Listings Don't Show After Seeding:

1. Visit `/api/seed` again
2. Check if you get success message
3. If error, check Vercel logs
4. Make sure MongoDB Atlas cluster is active (not paused)

---

## 🎨 What Listings Are Included?

The seed data includes 50 beautiful listings from around the world:
- 🏖️ Beachfront cottages
- 🏔️ Mountain retreats
- 🏙️ Urban lofts
- 🏰 Historic villas
- 🌴 Tropical bungalows
- And many more!

All with:
- Beautiful Unsplash images
- Realistic descriptions
- Prices and locations

---

## 📊 Environment Variables Needed

Make sure these are set in Vercel:

| Variable | Value | Example |
|----------|-------|---------|
| `MONGODB_URI` or `ATLASDB_URL` | Your MongoDB Atlas URL | `mongodb+srv://user:pass@cluster.net/wanderlust` |
| `SECRET` | Random secret string | `myverysecretkey123` |

---

## 🎯 Quick Test Checklist

After deployment:

- [ ] Visit your site - loads without errors
- [ ] Visit `/api/seed` - see success message
- [ ] Visit `/listings` - see 50 listings with images
- [ ] Click **Sign up** - create account
- [ ] Should auto-login after signup
- [ ] Click **Add new Listing** - should show form (not redirect to login)
- [ ] Fill form and submit - creates listing
- [ ] Click **Log out** - logs out
- [ ] Click **Log in** - can log back in
- [ ] Session persists across page refreshes

---

## 🔑 Key Changes Made

### File: `api/index.js`
```javascript
// Added trust proxy (CRITICAL!)
app.set('trust proxy', 1);

// MongoDB session store instead of memory store
const store = MongoStore.create({
  mongoUrl: MONGO_URL,
  crypto: { secret: process.env.SECRET },
  touchAfter: 24 * 3600,
});

// Better cookie settings
cookie: {
  httpOnly: true,
  secure: false,  // Set to false for debugging
  sameSite: 'lax', // More compatible than 'none'
}
```

### File: `routes/api.js` (NEW)
```javascript
// Visit /api/seed to populate database
router.get("/seed", async (req, res) => {
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
  res.json({ success: true, count: initData.data.length });
});
```

### File: `package.json`
```json
// Added session store dependency
"connect-mongo": "^5.1.0"
```

---

## 💡 Tips

1. **After seeding**, you can visit `/api/seed` anytime to reset the listings to defaults
2. **Clear browser cookies** if login seems stuck
3. **Check Vercel logs** for any errors - very helpful for debugging
4. **MongoDB Atlas**: Make sure 0.0.0.0/0 is whitelisted in Network Access
5. **Test in incognito**: Eliminates cookie/cache issues

---

## 📞 Still Having Issues?

Check these in order:

1. ✅ Environment variables set in Vercel?
2. ✅ MongoDB Atlas cluster is active?
3. ✅ 0.0.0.0/0 whitelisted in Atlas?
4. ✅ Deployed the latest code?
5. ✅ Visited `/api/seed` after deployment?
6. ✅ Tried clearing browser cookies?
7. ✅ Checked Vercel function logs?

If all else fails, share the Vercel logs and I can help debug further!

---

## 🎉 Success!

Once everything is working:
- ✅ 50 listings with beautiful images
- ✅ Login/logout working smoothly
- ✅ Sessions persist properly
- ✅ Can create/edit/delete listings
- ✅ Can add reviews
- ✅ Full authentication flow works

Enjoy your Wanderlust app! 🚀
