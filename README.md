# WanderLust - Travel Listings Platform

A full-stack web application for sharing and discovering travel destinations. Built with Node.js, Express, MongoDB, and EJS.

## Features

- 🏠 Create, read, update, and delete travel listings
- 👤 User authentication and authorization
- ⭐ Review and rating system
- 🖼️ Image upload with Cloudinary integration
- 📱 Responsive design
- 🔐 Secure session management

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas for production)
- **View Engine**: EJS with ejs-mate
- **Authentication**: Passport.js with Local Strategy
- **Image Storage**: Cloudinary
- **Validation**: Joi
- **Session**: Express-session with connect-flash

## Local Development Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or Atlas account)
- Cloudinary account

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd wanderlust-vercel
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
   - Copy `.env.example` to `.env`
   - Fill in your credentials:

```env
# For local development (optional)
# ATLASDB_URL=mongodb+srv://username:password@cluster.mongodb.net/wanderlust?retryWrites=true&w=majority

# Cloudinary Configuration
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Session Secret (optional for local dev)
SESSION_SECRET=your_random_secret_string_here
```

4. Run the application
```bash
npm start
# or for development with auto-restart
npm run dev
```

5. Open your browser and navigate to `http://localhost:8080`

## Vercel Deployment

### Prerequisites for Vercel

1. **MongoDB Atlas Account**: 
   - Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Whitelist all IPs (0.0.0.0/0) in Network Access for Vercel deployment
   - Get your connection string

2. **Cloudinary Account**:
   - Sign up at [Cloudinary](https://cloudinary.com/)
   - Get your Cloud Name, API Key, and API Secret

3. **Vercel Account**:
   - Sign up at [Vercel](https://vercel.com/)

### Deployment Steps

#### Method 1: Deploy via Vercel CLI

1. Install Vercel CLI globally
```bash
npm install -g vercel
```

2. Login to Vercel
```bash
vercel login
```

3. Deploy the project
```bash
vercel
```

4. Set environment variables in Vercel dashboard or via CLI:
```bash
vercel env add ATLASDB_URL
vercel env add CLOUD_NAME
vercel env add CLOUD_API_KEY
vercel env add CLOUD_API_SECRET
vercel env add SESSION_SECRET
```

#### Method 2: Deploy via Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket

2. Go to [Vercel Dashboard](https://vercel.com/dashboard)

3. Click "New Project" and import your repository

4. Configure Environment Variables:
   - Go to Project Settings → Environment Variables
   - Add the following variables:
     - `ATLASDB_URL`: Your MongoDB Atlas connection string
       - Example: `mongodb+srv://username:password@cluster.mongodb.net/wanderlust?retryWrites=true&w=majority`
     - `CLOUD_NAME`: Your Cloudinary cloud name
     - `CLOUD_API_KEY`: Your Cloudinary API key
     - `CLOUD_API_SECRET`: Your Cloudinary API secret
     - `SESSION_SECRET`: A random string for session encryption (generate one using: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)

5. Click "Deploy"

### Important Notes for Vercel Deployment

1. **Database Connection**: The app uses `ATLASDB_URL` environment variable for MongoDB connection on Vercel.

2. **Session Storage**: Currently using in-memory session storage. For production with multiple instances, consider using a persistent session store like:
   - connect-mongo (MongoDB session store)
   - connect-redis (Redis session store)

3. **File Uploads**: All user uploads are stored in Cloudinary, not on the server filesystem (which is ephemeral on Vercel).

4. **Environment Variables**: Never commit `.env` file. Always set environment variables in Vercel dashboard.

5. **MongoDB Atlas**: 
   - Make sure to whitelist Vercel's IP addresses (or use 0.0.0.0/0 for all IPs)
   - Use the connection string format: `mongodb+srv://...`

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `ATLASDB_URL` | MongoDB Atlas connection string | Yes (for Vercel) | Local MongoDB URL |
| `CLOUD_NAME` | Cloudinary cloud name | Yes | - |
| `CLOUD_API_KEY` | Cloudinary API key | Yes | - |
| `CLOUD_API_SECRET` | Cloudinary API secret | Yes | - |
| `SESSION_SECRET` | Secret for session encryption | Recommended | "mysupersecretcode" |
| `PORT` | Server port | No | 8080 (auto-set by Vercel) |

## Project Structure

```
wanderlust-vercel/
├── controllers/        # Route controllers
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── models/            # Mongoose models
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── routes/            # Express routes
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── views/             # EJS templates
│   ├── includes/
│   ├── layouts/
│   ├── listings/
│   └── users/
├── public/            # Static files
│   ├── css/
│   └── js/
├── utils/             # Utility functions
├── app.js             # Main application file
├── cloudConfig.js     # Cloudinary configuration
├── middleware.js      # Custom middleware
├── schema.js          # Joi validation schemas
├── vercel.json        # Vercel configuration
└── package.json       # Dependencies and scripts
```

## API Routes

- `GET /` - Home page
- `GET /listings` - View all listings
- `GET /listings/new` - New listing form
- `POST /listings` - Create new listing
- `GET /listings/:id` - View listing details
- `PUT /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing
- `POST /listings/:id/reviews` - Add review
- `DELETE /listings/:id/reviews/:reviewId` - Delete review
- `GET /signup` - Signup form
- `POST /signup` - Create new user
- `GET /login` - Login form
- `POST /login` - Authenticate user
- `GET /logout` - Logout user

## Security Features

- Password hashing with passport-local-mongoose
- Session-based authentication
- CSRF protection
- Input validation with Joi
- Authorization middleware
- HTTP-only cookies

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify your `ATLASDB_URL` is correct
   - Check if your IP is whitelisted in MongoDB Atlas
   - Ensure the database user has proper permissions

2. **Image Upload Fails**
   - Verify Cloudinary credentials are correct
   - Check if the API key has upload permissions

3. **Session Issues**
   - Make sure `SESSION_SECRET` is set in production
   - For multiple Vercel instances, consider using connect-mongo

## License

ISC

## Support

For issues and questions, please open an issue on the repository.
