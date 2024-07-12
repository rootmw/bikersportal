import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {});
    await mongoose.connection.collection("users").dropIndex("username_1");
    console.log(`Connected to Mongodb Database ${mongoose.connection.host}`);

    return { conn };
  } catch (error) {
    console.log(`MongoDb Error ${error}`);
    process.exit(1);
  }
};

export default connectDB;
