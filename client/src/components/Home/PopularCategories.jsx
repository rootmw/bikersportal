import React, { useEffect, useState } from "react";
import axios from "axios";

const PopularCategories = () => {
  const [popularEvents, setPopularEvents] = useState([]);

  useEffect(() => {
    const fetchpopularEvents = async () => {
      try {
        const response = await axios.get("https://bikersportal-backend1.onrender.com/api/v1/event/popular");
        setPopularEvents(response.data.data);
      } catch (error) {
        console.error("Error fetching popular events:", error);
      }
    };
    fetchpopularEvents();
  }, []);
  return (
    <div className="categories">
      <h3>POPULAR CATEGORIES</h3>
      <div className="banner">
        {popularEvents.map((event) => {
          return (
            <div className="card" key={event._id}>
              <div className="icon">{event.icon}</div>
              <div className="text">
                <p>{event.name}</p>
                <p>{event.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularCategories;