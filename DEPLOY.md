# Simple Deployment Instructions

## What's Fixed
1. ✅ MongoDB Atlas connection
2. ✅ Session storage in MongoDB (sessions persist)
3. ✅ Auto-seeding of 50 default listings on first load
4. ✅ Clean, minimal configuration

## Deploy Steps

1. Push to GitHub:
```bash
git add .
git commit -m "Vercel deployment fixed"
git push
```

2. In Vercel, set these environment variables:
   - `MONGODB_URI` = `mongodb+srv://sumitbhaskar430_db_user:FeqAr87XgTkbOg@cluster0.twtjfjl.mongodb.net/wanderlust?retryWrites=true&w=majority`
   - `SECRET` = `any-random-string-here`

3. Deploy and wait 2 minutes

4. Visit your site - listings will auto-load!

## Test
- Visit `/listings` - should show 50 listings
- Sign up for account
- Try adding a new listing
- Session should persist

## If it still doesn't work

Clear ALL browser cookies and try in incognito mode. Check Vercel function logs for errors.
