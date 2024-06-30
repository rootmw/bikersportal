import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { getProfile, updateProfile } from "../controller/profileController.js";

const router = express.Router();
router.get("/getprofile", userAuth, getProfile);

router.put("/updateprofile", userAuth, updateProfile);

export default router;
