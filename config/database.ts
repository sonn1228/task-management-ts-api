import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const connect = async (): Promise<void> => {
  try {
    const mongoUrl = process.env.MONGODB_URL;
    if (!mongoUrl) {
      throw new Error(
        "MONGODB_URL is not defined in the environment variables"
      );
    }
    await mongoose.connect(mongoUrl);
    console.log("Connect successfully");
  } catch (error) {
    console.error("Connect Failed", error);
  }
};
