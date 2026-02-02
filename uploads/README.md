# Uploads Folder

This folder is used for temporary file uploads during the Multer middleware processing.

**Important Notes:**

1. **Vercel Deployment**: This folder is not used in production on Vercel. All images are uploaded directly to Cloudinary.

2. **Local Development**: If you're running locally, uploaded files may temporarily appear here before being uploaded to Cloudinary.

3. **Git**: This folder is tracked by Git but the contents are ignored (only `.gitkeep` is committed).

4. **Cloudinary**: All permanent image storage is handled by Cloudinary. The configuration is in `cloudConfig.js`.

## How Image Upload Works

1. User uploads an image through the form
2. Multer processes the file
3. `multer-storage-cloudinary` uploads directly to Cloudinary
4. The Cloudinary URL is stored in the MongoDB database
5. No files are permanently stored on the server filesystem

This is important for Vercel deployment because Vercel's filesystem is ephemeral (read-only and resets between deployments).
