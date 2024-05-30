import React, { useState } from "react";
import "./../styles/style4.css";

const UpdateProfileForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    age: "",
    email: "",
    mobile_No: "",
    address: "",
    hobbies: "",
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
    <div className="card mb-4">
      <div className="card-header">Profile Details</div>
      <div className="card-body">
        <form className="form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="small mb-1" htmlFor="inputUsername">
              Username
            </label>
            <input
              className="form-control"
              id="inputUsername"
              type="text"
              placeholder="Enter your username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="row gx-3 mb-3">
            <div className="col-md-6">
              <label className="small mb-1" htmlFor="inputOrgName">
                Age
              </label>
              <input
                className="form-control"
                id="inputOrgName"
                type="text"
                placeholder="Enter your age"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="small mb-1" htmlFor="inputEmailAddress">
              Email address
            </label>
            <input
              className="form-control"
              id="inputEmailAddress"
              type="email"
              placeholder="Enter your email address"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="row gx-3 mb-3">
            <div className="col-md-6">
              <label className="small mb-1" htmlFor="inputPhone">
                Phone number
              </label>
              <input
                className="form-control"
                id="inputPhone"
                type="tel"
                placeholder="Enter your phone number"
                name="mobile_No"
                value={formData.mobile_No}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="small mb-1" htmlFor="address">
                Address
              </label>
              <input
                className="form-control"
                id="Address"
                type="text"
                placeholder="Enter your address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row gx-3 mb-3">
            <div className="mb-3">
              <label className="small mb-1" htmlFor="Hobbies">
                Hobbies
              </label>
              <input
                className="form-control"
                id="hobbies"
                type="text"
                placeholder="Enter your hobbies"
                name="hobbies"
                value={formData.hobbies}
                onChange={handleChange}
              />
            </div>
          </div>
          <button className="btn btn-primary" type="submit">
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileForm;
