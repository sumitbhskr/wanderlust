# WanderLust - Vercel Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. MongoDB Atlas Setup
- [ ] Created MongoDB Atlas account
- [ ] Created a free cluster (M0)
- [ ] Created database user with read/write permissions
- [ ] Whitelisted IP: 0.0.0.0/0 (allow from anywhere)
- [ ] Copied connection string
- [ ] Replaced `<password>` and `<dbname>` in connection string

**Your connection string should look like:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/wanderlust?retryWrites=true&w=majority
```

### 2. Cloudinary Setup
- [ ] Created Cloudinary account
- [ ] Noted Cloud Name: ________________
- [ ] Noted API Key: ________________
- [ ] Noted API Secret: ________________

### 3. Repository Setup
- [ ] Code pushed to GitHub/GitLab/Bitbucket
- [ ] `.env` file is in `.gitignore` (DO NOT commit `.env`)
- [ ] All files are committed and pushed

### 4. Vercel Account
- [ ] Created Vercel account
- [ ] Connected to Git provider (GitHub/GitLab/Bitbucket)

## 🚀 Deployment Steps

### Step 1: Import Project to Vercel
1. [ ] Go to https://vercel.com/dashboard
2. [ ] Click "Add New..." → "Project"
3. [ ] Select your repository

### Step 2: Configure Environment Variables
Add these 5 environment variables in Vercel:

1. [ ] **ATLASDB_URL**
   ```
   mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/wanderlust?retryWrites=true&w=majority
   ```

2. [ ] **CLOUD_NAME**
   ```
   your-cloudinary-cloud-name
   ```

3. [ ] **CLOUD_API_KEY**
   ```
   your-cloudinary-api-key
   ```

4. [ ] **CLOUD_API_SECRET**
   ```
   your-cloudinary-api-secret
   ```

5. [ ] **SESSION_SECRET**
   ```
   Generate using: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

### Step 3: Deploy
- [ ] Click "Deploy" button
- [ ] Wait for deployment (2-3 minutes)
- [ ] Note your deployment URL: ________________

## ✅ Post-Deployment Testing

Visit your Vercel URL and test:

1. [ ] Home page loads correctly
2. [ ] Can view all listings page
3. [ ] Can sign up for a new account
4. [ ] Can log in with new account
5. [ ] Can create a new listing (with image upload)
6. [ ] Can view listing details
7. [ ] Can add a review to a listing
8. [ ] Can edit your own listing
9. [ ] Can delete your own listing
10. [ ] Can log out

## 🔧 If Something Goes Wrong

### Database Connection Issues
- Verify ATLASDB_URL is correct
- Check MongoDB Atlas Network Access (0.0.0.0/0)
- Verify database user credentials

### Image Upload Issues
- Verify all Cloudinary credentials are set
- Check Cloudinary dashboard for errors

### Session Issues
- Verify SESSION_SECRET is set
- Try clearing browser cookies

### General Errors
1. Go to Vercel Dashboard → Your Project → Logs
2. Check the error messages
3. Verify all 5 environment variables are set

## 📝 Important Notes

1. **Local Development**: The app works locally with or without ATLASDB_URL
   - If ATLASDB_URL is not set, it uses local MongoDB (mongodb://127.0.0.1:27017/wanderlust)

2. **Environment Variables**: NEVER commit `.env` file to GitHub

3. **Security**: 
   - Use strong passwords for MongoDB Atlas
   - Generate a random SESSION_SECRET
   - Keep API secrets confidential

4. **Free Tier Limits**:
   - MongoDB Atlas: 512 MB storage
   - Cloudinary: 25 credits/month
   - Vercel: 100 GB bandwidth/month

## 📚 Additional Resources

- **Detailed Guide**: See `DEPLOYMENT_GUIDE.md`
- **Project Documentation**: See `README.md`
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com/

## ✨ Success!

Once all tests pass, your WanderLust app is live! 🎉

**Share your deployment URL**: ________________

---

**Need Help?**
- Check DEPLOYMENT_GUIDE.md for troubleshooting
- Review Vercel logs for error details
- Verify all environment variables are set correctly
