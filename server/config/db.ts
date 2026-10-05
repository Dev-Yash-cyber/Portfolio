import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || process.env.DATABASE_URL;

  if (!uri) {
    console.log('ℹ️ No MONGODB_URI provided in environment. Running with in-memory / local fallback storage.');
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB Atlas database successfully.');
  } catch (err) {
    console.warn('⚠️ MongoDB connection attempt failed. Continuing in resilient offline fallback mode.', err);
  }
};
