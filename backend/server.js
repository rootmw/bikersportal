//packages
import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import cors from "cors";

//files
import connectDB from "./config/db.js";
//routes
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import profileRoutes from "./routes/profileRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import userAuth from "./middlewares/authMiddleware.js";
import cookieParser from "cookie-parser";

//Dot ENV config
dotenv.config();

// mongodb connection
connectDB();

//rest object
const app = express();
app.use(
  cors({
    origin: "https://bikersportal-frontend.onrender.com",
    credentials: true,
  })
);

//middleware
app.use(express.json());
app.use(cookieParser());

//routes
app.use(`/api/v1/test`, testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/event", eventRoutes);
app.use("/api/v1/blog", blogRoutes);

//api

//validation middlewrare

app.use(userAuth);
app.use(errorMiddleware);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`node server running on port ${PORT}`);
});
