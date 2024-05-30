import express from "express";
import eventController, {
  checkUserRole,
  updateJobController,
  getAllEventsController,
  deleteeventController,
} from "./../controller/eventController.js";
import userAuth from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/createevent", userAuth, checkUserRole, eventController);

router.get("/getallevents", userAuth, getAllEventsController);

//update event
router.patch("/updateevent/:id", userAuth, updateJobController);

//delete event
router.delete("/deleteevent/:id", userAuth, deleteeventController);

export default router;
