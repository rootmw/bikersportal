import mongoose from "mongoose";
import validator from "validator";

//schema
const profileSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
      validate: validator.isAlphanumeric,
    },
    age: {
      type: Number,
      required: [true, "age is required"],
    },
    mobile_No: {
      type: Number,
      required: [true, "mobile no is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
    },
    address: {
      type: String,
      required: false,
    },
    hobbies: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
profileSchema.methods.generateAuthToken = function () {
  const tokenData = {
    _id: this._id,
    email: this.email,
    role: this.role,
    username: this.username,
  };
  const token = JWT.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
};

export default mongoose.model("Profile", profileSchema);
