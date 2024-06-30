import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Events = () => {
  const [Events, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("https://bikersportal-backend1.onrender.com/api/v1/event/getall", {
          headers: {
            Authorization: `Bearer ${token}`,
            'Cache-Control': 'no-cache',
            pragma: 'no-cache',
            Expires: '0',
          },
          withCredentials: true,
        });
        console.log("Fetched events:", response.data);
        setMyEvents(response.data.events);
      } catch (error) {
        console.error("Error fetching my events:", error);
        
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="events">
      <h3>ALL Events</h3>
      <div className="cards">
        {Events.length > 0 ? (
          Events.map((event) => (
            <div className="card" key={event._id}>
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={`/event/${event._id}`}>{event.eventname}</Link>
                </h5>
                <p className="card-text">{event.eventdescription}</p>
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