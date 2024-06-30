import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const registerController = async (req, res, next) => {
  const { firstname, lastname, email, password, role } = req.body;

  // Validate
  if (!firstname) {
    return res.status(400).json({ message: "Please provide first name" });
  }
  if (!lastname) {
    return res.status(400).json({ message: "Please provide last name" });
  }
  if (!email) {
    return res.status(400).json({ message: "Please provide email" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ message: "Please provide password greater than 6 characters" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password should be greater than 6 characters" });
  }
  if (!role) {
    return res.status(400).json({ message: "Please provide your role" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already registered. Please login" });
    }

    const user = await userModel.create({
      firstname,
      lastname,
      email,
      password,
      role,
    });
    const token = user.generateAuthToken();
    res.status(201).send({
      success: true,
      message: "User created successfully",
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    next(error); // Pass errors to the error middleware
  }
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ message: "Please provide all fields" });
  }

  try {
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    user.password = undefined;
    const token = user.generateAuthToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // use secure cookies in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.status(200).json({
      success: true,
      message: "Login successfully",
      user,
      token,
    });
  } catch (error) {
    next(error); // Pass errors to the error middleware
  }
};

export const logoutController = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  res.status(200).json({ message: "Logged out successfully" });
};
export default { registerController, loginController, logoutController };
