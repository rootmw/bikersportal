import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import cookieParser from "cookie-parser";
import express from "express";

const app = express();
app.use(cookieParser());

const userAuth = async (req, res, next) => {
  let token;

  // Check header first
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    // Fallback to checking cookie
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decoded._id).select("-password");
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export default userAuth;
