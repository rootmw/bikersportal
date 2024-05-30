//Api documentation
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";

//packages
import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
//import cors from "cors";
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
import joineventRoutes from "./routes/joineventRoutes.js";

//Dot ENV config
dotenv.config();

// mongodb connection
connectDB();

// swagger api options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "biker's Portal Application",
      description: "Node Expressjs bikers Portal Application",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const spec = swaggerDoc(options);

//rest object
const app = express();

//middleware
app.use(express.json());

//routes
app.use(`/api/v1/test`, testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/event", eventRoutes);
app.use("/api/v1/join", joineventRoutes);

//api
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));

//validation middlewrare
app.use(errorMiddleware);
app.use(userAuth);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("node server running on port 8080");
});
