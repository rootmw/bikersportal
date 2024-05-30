import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { updateUserController } from "../controller/updateController.js";

const router = express.Router();
router.put("/updateprofile", userAuth, updateUserController);

export default router;
