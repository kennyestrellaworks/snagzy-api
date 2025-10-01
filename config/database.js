import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // keep the server selection reasonably short so deployments fail-fast when misconfigured
      serverSelectionTimeoutMS: 10000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // log full error for better diagnostics in hosted environments
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
