import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: validator.isEmail,
    },
    password: { type: String, required: true, minlength: 6, select: true },
    role: {
      type: String,
      required: true,
      enum: ["user", "creator"],
      default: "user",
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    username: {
      type: String,
      unique: true,
      validate: validator.isAlphanumeric,
      sparse: true,
    },
    age: {
      type: Number,
    },
    mobile_No: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = async function (userpassword) {
  return await bcrypt.compare(userpassword, this.password);
};

userSchema.methods.generateAuthToken = function () {
  const tokenData = {
    _id: this._id,
    email: this.email,
    role: this.role,
    username: this.username,
  };
  return JWT.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export default mongoose.model("User", userSchema);
