//packages
import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import cors from "cors";
//import morgan from "morgan";

//files
import connectDB from "./config/db.js";
//routes
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import profileRoutes from "./routes/profileRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import userAuth from "./middlewares/authMiddleware.js";

//Dot ENV config
dotenv.config();

// mongodb connection
connectDB();

//rest object
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // frontend URL
    credentials: true, // to allow cookies and other credentials
  })
);

//middleware
app.use(express.json());

//routes
app.use(`/api/v1/test`, testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/event", eventRoutes);

//api

//validation middlewrare

app.use(userAuth);
app.use(errorMiddleware);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`node server running on port ${PORT}`);
});
