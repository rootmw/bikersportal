import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { joinEventController } from "./../controller/joineventController.js";

const router = express.Router();

router.post("/joinevent/:id", userAuth, joinEventController);
export default router;
