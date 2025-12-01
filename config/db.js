// config/db.js
import mongoose from "mongoose";

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

export default connectDB;
