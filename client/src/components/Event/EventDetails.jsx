import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams();
  const [eventDetails, setEventDetails] = useState({});

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`http://localhost:8080/api/v1/event/${id}`, {
          headers: {
            'Authorization':`Bearer ${token}`,
            'Cache-Control': 'no-cache',
            'pragma': 'no-cache',
            'Expires': '0'
          }
        });
        setEventDetails(response.data.event);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [id]);

  return (
    <div className="event-details">
      <h3>{eventDetails.eventname}</h3>
      <p>{eventDetails.eventdescription}</p>
      <p>{eventDetails.eventdate}</p>
      <p>{eventDetails.eventvenue}</p>
      <p>{eventDetails.contact}</p>
      <p>{eventDetails.maxParticipants}</p>
    </div>
  );
};

export default EventDetails;