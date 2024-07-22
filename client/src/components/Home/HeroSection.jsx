
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaMotorcycle, FaLocationArrow } from "react-icons/fa";


const HeroSection = () => {
  const [eventCount,setEventCount] = useState(0);
  const [locationCount, setLocationCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventResponse = await axios.get("https://bikersportal-backend1.onrender.com/api/v1/event/count");
        const locationResponse = await axios.get("https://bikersportal-backend1.onrender.com/api/v1/location/count");
        setEventCount(eventResponse.data.count);
        setLocationCount(locationResponse.data.count);
      } catch (error) {
        console.error('Error fetching data:',error);
      }
    };
    fetchData();
  }, []);
  const details = [
    {
      id: 1,
      title: eventCount,
      subTitle: "Live Events",
      icon: <FaMotorcycle />,
    },
    {
      id: 2,
      title: locationCount,
      subTitle: "Locations",
      icon: <FaLocationArrow />,
    }
  ];
  return (
    <>
      <div className="heroSection">
        <div className="container">
          <div className="title">
            <h1>Welcome to Biker's Portal</h1>
            <h1>Connect and Engage!!!</h1>
            <p>
            Discover the ultimate destination for biking enthusiasts! Whether you're a seasoned rider or just starting out, Biker's Portal offers a comprehensive platform to explore, connect, and engage with the biking community.
            </p>
          </div>
          <div className="image">
            <img src="https://imgs.search.brave.com/O37rZl5loKKEtumQ_lViSK9wm_m5i7taf5jMgwe25fk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxOS8w/OS8wOS8wOS81MC9y/aWRlci00NDYzMjE4/XzY0MC5wbmc" alt="BikeIllustration" />
          </div>
        </div>
        <div className="details">
          {details.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="icon">{element.icon}</div>
                <div className="content">
                  <p>{element.title}</p>
                  <p>{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
