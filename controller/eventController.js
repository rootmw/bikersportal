import userModel from "../models/userModel.js";
import eventModel from "../models/eventModel.js";
import userAuth from "../middlewares/authMiddleware.js";
export const checkUserRole = async (req, res, next) => {
  try {
    // Get the user from the database using req.user.userId (assuming you have middleware to populate req.user)
    const user = await userModel.findOne(req.body.role);

    // Check if the user exists and has the role of "creator"
    if (!user || user.role !== "creator") {
      // If the user is not found or does not have the required role, send a 403 (Forbidden) response
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access" });
    }

    // If the user has the required role, proceed to the next middleware/controller
    next();
  } catch (error) {
    // If an error occurs, handle it and send a 500 (Internal Server Error) response
    console.error("Error checking user role:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const eventController = async (req, res, next) => {
  const {
    eventname,
    eventdescription,
    eventvenue,
    eventdate,
    contact,
    maxParticipants,
    createdBy,
  } = req.body;
  //validate

  if (
    !eventname ||
    !eventdescription ||
    !eventvenue ||
    !eventdate ||
    !contact ||
    !maxParticipants
  ) {
    next("Please Provide All Fields");
  }

  const newEvent = new eventModel({
    eventname,
    eventdescription,
    eventvenue,
    eventdate,
    contact,
    maxParticipants,
    createdBy: req.body.userID, // Assign createdBy field from req.body
  });
  await newEvent.save();
  res.status(201).send({
    success: true,
    message: "event created successfully",
    newEvent,
  });
};

export default eventController;

//get events
export const getAllEventsController = async (req, res, next) => {
  const events = await eventModel.find({ createdBy: req.user.userID });
  res.status(200).json({
    totalevents: events.length,
    events,
  });
};

//update job
export const updateJobController = async (req, res, next) => {
  const { id } = req.params;
  const {
    eventname,
    eventdescription,
    eventvenue,
    eventdate,
    contact,
    maxParticipants,
    createdBy,
  } = req.body;

  //find job
  const events = await eventModel.findOne({ _id: id });
  //validation
  if (!events) {
    next(`no events found with this id ${id}`);
  }
  if (!req.user.userId === events.createdBy) {
    next("Your Not Authorized to update this event");
    return;
  }
  const updateEvent = await eventModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  //res
  res.status(201).send({
    success: true,
    message: "event updated successfully",
    updateEvent,
  });
};

//delete event
export const deleteeventController = async (req, res, next) => {
  const { id } = req.params;
  //find job
  const event = await eventModel.findOne({ _id: id });
  //validation
  if (!event) {
    next(`No event Found With This ID ${id}`);
  }
  if (!req.user.userId === event.createdBy) {
    next("Your Not Authorize to delete this event");
    return;
  }
  await event.deleteOne();
  res.status(201).send({
    success: true,
    message: "event deleted successfully",
  });
};
