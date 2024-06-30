import userModel from "../models/userModel.js";
import eventModel from "../models/eventModel.js";
import { ErrorHandler } from "../middlewares/errorhandler.js";

export const getAllEvents = async (req, res, next) => {
  try {
    const events = await eventModel
      .find()
      .populate("createdBy", "username email");
    res.status(200).json({ success: true, events });
  } catch (error) {
    next(error);
  }
};

export const createEvent = async (req, res, next) => {
  const {
    eventname,
    eventdescription,
    eventvenue,
    eventdate,
    contact,
    maxParticipants,
  } = req.body;
  const userId = req.user._id;

  try {
    const user = await userModel.findById(userId);
    if (user.role !== "creator") {
      return next(
        new ErrorHandler("You are not authorized to create events", 403)
      );
    }

    const newEvent = await eventModel.create({
      eventname,
      eventdescription,
      eventvenue,
      eventdate,
      contact,
      maxParticipants,
      createdBy: userId,
    });

    res.status(201).json({ success: true, event: newEvent });
  } catch (error) {
    next(error);
  }
};

export const getMyEvents = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const events = await eventModel.find({ createdBy: userId });
    res.status(200).json({ success: true, events });
  } catch (error) {
    next(error);
  }
};

// Controller to get details of a single event
export const getEventDetails = async (req, res, next) => {
  const { id } = req.params;

  try {
    const event = await eventModel
      .findById(id)
      .populate("createdBy", "username email");
    if (!event) {
      return next(new ErrorHandler("Event not found", 404));
    }
    res.status(200).json({ success: true, event });
  } catch (error) {
    next(error);
  }
};

// Controller to update an event
export const updateEvent = async (req, res, next) => {
  const { id } = req.params;
  const {
    eventname,
    eventdescription,
    eventvenue,
    eventdate,
    contact,
    maxParticipants,
  } = req.body;
  const userId = req.user._id;

  try {
    const event = await eventModel.findById(id);
    if (!event) {
      return next(new ErrorHandler("Event not found", 404));
    }

    if (event.createdBy.toString() !== userId.toString()) {
      return next(
        new ErrorHandler("You are not authorized to update this event", 403)
      );
    }

    event.eventname = eventname || event.eventname;
    event.eventdescription = eventdescription || event.eventdescription;
    event.eventvenue = eventvenue || event.eventvenue;
    event.eventdate = eventdate || event.eventdate;
    event.contact = contact || event.contact;
    event.maxParticipants = maxParticipants || event.maxParticipants;

    await event.save();

    res
      .status(200)
      .json({ success: true, message: "updated successfully", event });
  } catch (error) {
    next(error);
  }
};

// Controller to delete an event
export const deleteEvent = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const event = await eventModel.findById(id);
    if (!event) {
      return next(new ErrorHandler("Event not found", 404));
    }

    if (event.createdBy.toString() !== userId.toString()) {
      return next(
        new ErrorHandler("You are not authorized to delete this event", 403)
      );
    }

    await event.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const joinEvent = async (req, res) => {
  try {
    const { id } = req.params; // Correct destructuring of eventId from params
    const { _id: userId, username } = req.user; // Assuming user ID and username are available in req.user

    // Find the event by ID
    const event = await eventModel.findById(id);

    // Check if the event exists
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    // Check if the user is already a participant
    const isAlreadyParticipant = event.participants.some(
      (participant) => participant.user.toString() === userId.toString()
    );

    if (isAlreadyParticipant) {
      return res
        .status(400)
        .json({ success: false, message: "User is already a participant" });
    }

    // Add the user to the participants list and increment participants count
    event.participants.push({ user: userId, username });
    event.participantsCount++;

    // Save the updated event
    await event.save();

    // Return a success response
    res
      .status(200)
      .json({ success: true, message: "Joined event successfully", event });
  } catch (error) {
    // Handle errors
    console.error("Error joining event:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const getPopularEvents = async (req, res) => {
  try {
    const popularEvents = await eventModel
      .find()
      .sort({ participants: -1 })
      .limit(5); // Adjust the field name and limit as needed
    res.status(200).json({
      success: true,
      data: popularEvents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getJoinedEvents = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const events = await eventModel.find({ "participants.user": userId });
    res.status(200).json({ success: true, events });
  } catch (error) {
    next(error);
  }
};
