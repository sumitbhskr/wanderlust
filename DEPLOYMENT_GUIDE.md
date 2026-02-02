# Vercel Deployment Guide for WanderLust

## Quick Start Checklist

- [ ] MongoDB Atlas cluster created and configured
- [ ] Cloudinary account set up
- [ ] Code pushed to Git repository (GitHub/GitLab/Bitbucket)
- [ ] Vercel account created
- [ ] Environment variables ready

## Step-by-Step Deployment Process

### 1. Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or log in
3. Create a new cluster (Free tier M0 is fine)
4. Wait for cluster to be created (2-3 minutes)
5. Configure database access:
   - Click "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Create a username and password (save these!)
   - Set permissions to "Read and write to any database"
6. Configure network access:
   - Click "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm
7. Get your connection string:
   - Click "Clusters" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `wanderlust`
   - Final format: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/wanderlust?retryWrites=true&w=majority`

### 2. Set Up Cloudinary

1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for a free account
3. After login, go to Dashboard
4. Note down these credentials:
   - Cloud Name
   - API Key
   - API Secret
5. (Optional) Create a folder named "WanderLust" in Media Library

### 3. Prepare Your Repository

1. Make sure your code is in a Git repository
2. Verify the following files exist:
   - `vercel.json` ✓
   - `.env.example` ✓
   - `.gitignore` (should include `.env`) ✓
   - `package.json` (with "start" script) ✓
   - `README.md` ✓

3. Commit and push your code:
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 4. Deploy to Vercel

#### Option A: Via Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your Git repository
4. Configure project:
   - **Framework Preset**: Other
   - **Root Directory**: ./
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)
   - **Install Command**: npm install

5. Add Environment Variables (before deploying):
   Click "Environment Variables" and add:
   
   ```
   Name: ATLASDB_URL
   Value: mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/wanderlust?retryWrites=true&w=majority
   ```
   
   ```
   Name: CLOUD_NAME
   Value: your_cloudinary_cloud_name
   ```
   
   ```
   Name: CLOUD_API_KEY
   Value: your_cloudinary_api_key
   ```
   
   ```
   Name: CLOUD_API_SECRET
   Value: your_cloudinary_api_secret
   ```
   
   ```
   Name: SESSION_SECRET
   Value: generate_a_random_string_here
   ```
   
   To generate a secure SESSION_SECRET, run:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

6. Click "Deploy"

7. Wait for deployment to complete (2-3 minutes)

8. Visit your deployed URL!

#### Option B: Via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Navigate to your project directory:
```bash
cd wanderlust-vercel
```

4. Deploy:
```bash
vercel
```

5. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? **Select your account**
   - Link to existing project? **N**
   - Project name? **wanderlust** (or your choice)
   - Directory? **./
   - Override settings? **N**

6. Add environment variables:
```bash
vercel env add ATLASDB_URL
# Paste your MongoDB connection string when prompted

vercel env add CLOUD_NAME
# Paste your Cloudinary cloud name

vercel env add CLOUD_API_KEY
# Paste your Cloudinary API key

vercel env add CLOUD_API_SECRET
# Paste your Cloudinary API secret

vercel env add SESSION_SECRET
# Paste a random secure string
```

7. Redeploy with environment variables:
```bash
vercel --prod
```

### 5. Verify Deployment

1. Visit your Vercel URL
2. Test the following:
   - [ ] Home page loads
   - [ ] Can view listings
   - [ ] Can sign up (creates new user in database)
   - [ ] Can log in
   - [ ] Can create new listing (tests Cloudinary upload)
   - [ ] Can add review
   - [ ] Can edit own listing
   - [ ] Can delete own listing

### 6. Post-Deployment Configuration

#### Set Up Custom Domain (Optional)

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

#### Monitor Your Application

1. Go to your project in Vercel Dashboard
2. Click "Analytics" to see visitor data
3. Click "Logs" to see real-time application logs
4. Click "Deployments" to see deployment history

### 7. Updating Your Application

Whenever you push changes to your Git repository, Vercel will automatically redeploy.

```bash
# Make changes to your code
git add .
git commit -m "Update feature"
git push origin main
# Vercel will automatically deploy
```

## Common Issues and Solutions

### Issue 1: "Cannot connect to database"

**Solution:**
- Verify `ATLASDB_URL` is correctly set in Vercel
- Check if MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Ensure database user has correct permissions
- Verify the connection string format is correct

### Issue 2: "Image upload fails"

**Solution:**
- Verify all Cloudinary environment variables are set
- Check if API key has upload permissions
- Verify Cloudinary account is active

### Issue 3: "Session not persisting"

**Solution:**
- Ensure `SESSION_SECRET` is set in Vercel environment variables
- The app now uses MongoDB session store (connect-mongo) which is already configured
- Sessions are stored in MongoDB Atlas, so they persist correctly across serverless function invocations
- If still having issues, clear browser cookies and try again

### Issue 4: "Function timeout"

**Solution:**
- Vercel free tier has 10-second timeout
- Optimize database queries
- Consider upgrading to Pro plan for 60-second timeout

### Issue 5: "502 Bad Gateway"

**Solution:**
- Check Vercel function logs for errors
- Verify all environment variables are set
- Check if the application starts correctly locally

## Environment Variables Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| ATLASDB_URL | MongoDB connection | `mongodb+srv://user:pass@cluster.net/wanderlust` |
| CLOUD_NAME | Cloudinary identifier | `your-cloud-name` |
| CLOUD_API_KEY | Cloudinary API access | `123456789012345` |
| CLOUD_API_SECRET | Cloudinary secret | `abcdefghijklmnopqrstuvwxyz` |
| SESSION_SECRET | Session encryption | `random-32-byte-hex-string` |

## Performance Optimization Tips

1. **Enable MongoDB connection pooling** (already configured in mongoose)

2. **Add indexes to frequently queried fields**:
```javascript
// In your models
listingSchema.index({ country: 1 });
listingSchema.index({ owner: 1 });
```

3. **Implement caching for static content**

4. **Compress responses**:
```bash
npm install compression
```

```javascript
const compression = require('compression');
app.use(compression());
```

5. **Use MongoDB Atlas free tier efficiently**:
   - Monitor database size in Atlas Dashboard
   - Free tier: 512 MB storage limit

## Security Best Practices

1. **Never commit `.env` file**
2. **Use strong SESSION_SECRET** (32+ characters, random)
3. **Keep dependencies updated**: `npm audit fix`
4. **Use environment-specific secrets**
5. **Enable HTTPS** (automatic on Vercel)
6. **Implement rate limiting** (optional):

```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);
```

## Support and Resources

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)

## Monitoring and Maintenance

### Regular Tasks

1. **Weekly**: Check Vercel analytics and logs
2. **Monthly**: Review MongoDB Atlas usage
3. **Monthly**: Check Cloudinary storage usage
4. **Quarterly**: Update npm dependencies
5. **As needed**: Respond to Vercel email notifications

### Scaling Considerations

As your app grows, consider:

1. **Database**: Upgrade MongoDB Atlas tier
2. **Compute**: Upgrade Vercel plan for higher limits
3. **Storage**: Monitor Cloudinary usage
4. **Sessions**: Implement persistent session store (connect-mongo)
5. **CDN**: Leverage Vercel's global CDN

## Rollback Procedure

If a deployment fails:

1. Go to Vercel Dashboard → Your Project → Deployments
2. Find the last working deployment
3. Click the three dots → "Promote to Production"
4. Your app will instantly rollback to that version

## Success Checklist

Your deployment is successful when:

- [x] App is accessible via Vercel URL
- [x] Database connection works (can create/view listings)
- [x] Authentication works (signup/login)
- [x] Image upload works (create listing with image)
- [x] All CRUD operations work
- [x] Reviews can be added and deleted
- [x] Sessions persist across requests
- [x] No errors in Vercel logs

Congratulations! Your WanderLust application is now live on Vercel! 🎉
