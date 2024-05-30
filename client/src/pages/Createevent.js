import React, { useState } from "react";
import "./../styles/style4.css";

const EventForm = () => {
  const [formData, setFormData] = useState({
    eventname: "",
    eventdescription: "",
    eventvenue: "",
    eventdate: "",
    contact: "",
    maxparticipants: "",
  });

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle form submission here
    console.log(formData); // Example: Log form data to the console
  };

  return (
    <div className="card-body">
      <form onSubmit={handleSubmit}>
        <div className="row gutters">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <h6 className="mb-2 text-primary">Event Details</h6>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="form-group">
              <label htmlFor="eventname">Event Name</label>
              <input
                type="text"
                className="form-control"
                id="eventName"
                placeholder="Enter event name"
                name="eventname"
                value={formData.eventname}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventdescription">Event description</label>
              <input
                type="text"
                className="form-control"
                id="eventName"
                placeholder="Enter event description"
                name="eventdescription"
                value={formData.eventdescription}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventvenue">Event Name</label>
              <input
                type="text"
                className="form-control"
                id="eventvenue"
                placeholder="Enter event venue"
                name="eventvenue"
                value={formData.eventvenue}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventdate">Event Name</label>
              <input
                type="text"
                className="form-control"
                id="eventdate"
                placeholder="Enter event date"
                name="eventdate"
                value={formData.eventdate}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact">contact</label>
              <input
                type="text"
                className="form-control"
                id="contact"
                placeholder="Enter contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="maxparticipants">max participants</label>
              <input
                type="text"
                className="form-control"
                id="maxparticipants"
                placeholder="Enter maxparticipants"
                name="maxparticipants"
                value={formData.maxparticipants}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* Add other event detail fields here */}
        </div>
        <div className="row gutters">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="text-right">
              <button
                type="button"
                className="btn btn-secondary mr-2"
                onClick={() => console.log("Cancel")}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
