import express from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventDetails,
  getJoinedEvents,
  getMyEvents,
  getPopularEvents,
  joinEvent,
  updateEvent,
} from "./../controller/eventController.js";
import userAuth from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/getall", userAuth, getAllEvents);
router.post("/createevent", userAuth, createEvent);

router.get("/me", userAuth, getMyEvents);

router.get("/:id", userAuth, getEventDetails);

router.get("/joined/:id", userAuth, getJoinedEvents);
//update event
router.put("/update/:id", userAuth, updateEvent);
//delete event
router.delete("/delete/:id", userAuth, deleteEvent);
//join event
router.post("/:id/join", userAuth, joinEvent);

router.get("/popular", userAuth, getPopularEvents);

export default router;
