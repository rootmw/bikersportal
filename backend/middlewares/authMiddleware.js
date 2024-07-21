import JWT from "jsonwebtoken";
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
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = JWT.verify(token, process.env.JWT_SECRET);
      req.user = await userModel.findById(decoded._id).select("-password");
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

export default userAuth;
