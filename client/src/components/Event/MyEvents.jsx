import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MyEvents = () => {
  const [Myevents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching events: {error.message}</div>;
  }

  return (
    <div className="my-events">
      <h3>YOUR EVENTS</h3>
      <div className="cards">
        {Myevents.length > 0 ? (
          Myevents.map((event) => (
            <div className="card" key={event._id}>
              <div className="card-body">
                <h5 className="card-title">
                <Link to={`/event/${event._id}`}>{event.eventname}</Link>
                </h5>
                <p className="card-text">{event.description}</p>
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