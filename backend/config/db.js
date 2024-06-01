import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config(); // Load environment variables

const connectDB = async () => {
  try {
    const url =
      "mongodb+srv://brightdjogatse:selorm112@kitchen1.oxl0pyi.mongodb.net/kitchen1";
    await mongoose.connect(url);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;

// MONGODB_URI=mongodb+srv://brightdjogatse:selorm112@kitchen1.oxl0pyi.mongodb.net/?retryWrites=true&w=majority&appName=kitchen1