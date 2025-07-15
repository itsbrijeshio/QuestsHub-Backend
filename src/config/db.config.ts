import mongoose from "mongoose";
import env from "./env.config";

const connectDB = async (): Promise<void> => {
  await mongoose.connect(env.MONGODB_URL as string);
  console.log("Connected to MongoDB");
};

export default connectDB;
