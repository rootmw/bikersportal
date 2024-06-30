import React, { useState, useContext } from "react";
import axios from "axios";
import { Context } from "../../index";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const CreateEvent = () => {
  const { isAuthorized } = useContext(Context);
  const navigate = useNavigate();

  const [eventname, setEventName] = useState("");
  const [eventdescription, setEventDescription] = useState("");
  const [eventvenue, setEventVenue] = useState("");
  const [eventdate, setEventDate] = useState("");
  const [contact, setContact] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthorized) {
      toast.error("You must be logged in to create an event.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        "https://bikersportal-backend1.onrender.com/api/v1/event/createevent",
        {
          eventname,
          eventdescription,
          eventvenue,
          eventdate,
          contact,
          maxParticipants,
        },
        config
      );

      toast.success(data.message);
      navigate("/event/getall");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create the event"
      );
    }
  };

  return (
    <section className="createEventPage">
      <div className="container">
        <div className="header">
          <h1 className="createEventTitle">Create New Event</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="eventname">Event Name</label>
            <input
              type="text"
              id="eventname"
              value={eventname}
              onChange={(e) => setEventName(e.target.value)}
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="eventdescription">Event Description</label>
            <textarea
              id="eventdescription"
              value={eventdescription}
              onChange={(e) => setEventDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="formGroup">
            <label htmlFor="eventvenue">Event Venue</label>
            <input
              type="text"
              id="eventvenue"
              value={eventvenue}
              onChange={(e) => setEventVenue(e.target.value)}
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="eventdate">Event Date</label>
            <input
              type="date"
              id="eventdate"
              value={eventdate}
              onChange={(e) => setEventDate(e.target.value)}
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="contact">Contact Number</label>
            <input
              type="text"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="maxParticipants">Max Participants</label>
            <input
              type="number"
              id="maxParticipants"
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submitButton">
            Create Event
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateEvent;
