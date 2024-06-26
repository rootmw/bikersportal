import mongoose from "mongoose";
import userModel from "./userModel.js";

// Define the Person schema
const createeventSchema = new mongoose.Schema(
  {
    eventname: {
      type: String,
      required: true,
    },
    eventdescription: {
      type: String,
      required: true,
    },
    eventvenue: {
      type: String,
      required: true,
    },
    eventdate: {
      type: Date,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    maxParticipants: {
      type: Number,
      required: [true, "max participants is required"],
    },

    participants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        joinedAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
    participantsCount: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const CreateEvent = mongoose.model("CreateEvent", createeventSchema);
export default CreateEvent;
