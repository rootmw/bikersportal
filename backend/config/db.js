import mongoose from "mongoose";
import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to Mongodb Database ${mongoose.connection.host}`);

    return { conn };
  } catch (error) {
    console.log(`MongoDb Error ${error}`);
    process.exit(1);
  }
};

export default connectDB;
