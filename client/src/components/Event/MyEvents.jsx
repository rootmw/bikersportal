import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyEvents = () => {
  const [Myevents, setMyEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/api/v1/event/me", {
          headers: {
            'Authorization':`Bearer ${token}`,
            'Cache-Control': 'no-cache',
            'pragma': 'no-cache',
            'Expires': '0'
          }
        });
        console.log("Fetched events:", response.data);
        setMyEvents(response.data.events); 
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchMyEvents();
  }, []);

  const handleDetails = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <div className="my-events">
      <h3>YOUR EVENTS</h3>
      <div className="cards">
        {Myevents.length > 0 ? (
          Myevents.map((event) => (
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

export default MyEvents;