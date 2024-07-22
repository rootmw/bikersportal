import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const MyJoinedEvents = () => {
  const { id } = useParams();
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJoinedEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://bikersportal-backend1.onrender.com/api/v1/event/joined/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Cache-Control': 'no-cache',
            'pragma': 'no-cache',
            'Expires': '0'
          },
          withCredentials: true
        });

        console.log("Fetched joined events:", response.data);
        setJoinedEvents(response.data.events);
      } catch (error) {
        console.error("Error fetching joined events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJoinedEvents();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div className="joined-events">
      <h3>My Joined Events</h3>
      <div className="cards">
        {joinedEvents.length > 0 ? (
          joinedEvents.map((event) => (
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

export default MyJoinedEvents;