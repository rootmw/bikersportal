import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/api/v1/event/getall", {
          headers: {
            'Authorization':`Bearer ${token}`,
            'Cache-Control': 'no-cache',
            'pragma': 'no-cache',
            'Expires': '0'
          }
        });
        console.log("Fetched events:", response.data);
        setEvents(response.data.events); 
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleDetails = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <div className="events">
      <h3>All Events</h3>
      <div className="cards">
        {events.length > 0 ? (
          events.map((event) => (
            <div className="card" key={event._id}>
              <div className="card-body">
                <h5 className="card-title">{event.name}</h5>
                <p className="card-text">{event.description}</p>
                <button onClick={() => handleDetails(event._id)} className="btn btn-primary">
                  Get Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </div>
  );
};

export default Events;