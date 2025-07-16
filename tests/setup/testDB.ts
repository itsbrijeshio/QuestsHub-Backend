import mongoose from "mongoose";
import { env } from "../../src/config";

export const connectTestDB = async () => {
  await mongoose.connect(env.MONGODB_URL as string, {
    serverSelectionTimeoutMS: 5000,
  });
};

export const disconnectTestDB = async () => {
  await mongoose.connection.close();
};

export const clearTestDB = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};
