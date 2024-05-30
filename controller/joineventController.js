import userModel from "../models/userModel.js";
import eventModel from "../models/eventModel.js";
import userAuth from "../middlewares/authMiddleware.js";

export const joinEventController = async (req, res) => {
  try {
    const { eventId } = req.params.id;
    const { userId, username } = req.user; // Assuming user ID and username are available in req.user

    // Find the event by ID
    const event = await eventModel.findOne(eventId);

    // Check if the event exists
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    // Check if the user is already a participant
    /*if (event.participants.includes(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "User is already a participant" });
    }*/

    // Add the user to the participants list and increment participants count
    event.participants.push(userId);
    event.participantsCount++;

    // Append the name of the participant to the participantsNames array
    //event.participants.push(username);
    const user = await userModel.findOne({ username: username }); // Find the user by their username
    if (user) {
      event.participants.push({ user: user._id, username: user.username }); // Add the participant to the array
    }

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

export default joinEventController;
