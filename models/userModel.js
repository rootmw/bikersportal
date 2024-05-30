import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
//schema
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "first name is required"],
    },
    lastname: {
      type: String,
      required: [true, "last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [6, "Password length should be greater than 6 character"],
      select: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "creator"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;

  //hash the password only if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  try {
    //hash password generation
    const hashedpassword = await bcrypt.genSalt(10);

    //override the plain password with the hashed one
    user.password = hashedpassword;
    next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function (userpassword) {
  try {
    //use bcrypt to compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(userpassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};

//json webtoken
//JSON WEBTOKEN
userSchema.methods.generateAuthToken = function () {
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
export default mongoose.model("User", userSchema);
