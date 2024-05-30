import React, { useState } from "react";
import "./../styles/style1.css";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(values); // Output form values to console
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="wrapper">
        <nav className="nav">
          <div className="nav-logo">
            <p>Biker's Portal</p>
          </div>
        </nav>
        <div className="form-box">
          <div className="register-container" id="register">
            <div className="top">
              <span>
                Have an account?{" "}
                <a href="/login" onClick={redirectToLogin}>
                  login
                </a>
              </span>
              <header>Sign Up</header>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="two-forms">
                <div className="input-box">
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Firstname"
                    name="firstname"
                    value={values.firstname}
                    onChange={handleChange}
                  />
                  <i className="bx bx-user" />
                </div>
                <div className="input-box">
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Lastname"
                    name="lastname"
                    value={values.lastname}
                    onChange={handleChange}
                  />
                  <i className="bx bx-user" />
                </div>
              </div>
              <div className="input-box">
                <input
                  type="email"
                  className="input-field"
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
                <i className="bx bx-envelope" />
              </div>
              <div className="input-box">
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="input-field"
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                />
                <i className="bx bx-lock-alt" />
                <input
                  type="checkbox"
                  id="showPassword"
                  onClick={togglePasswordVisibility}
                />
                <label htmlFor="showPassword">Show Password</label>
              </div>
              <div className="input-box">
                <input
                  type="text"
                  className="input-field"
                  placeholder="user or creator"
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                />
                <i className="bx bx-user" />
              </div>
              <div className="input-box">
                <input type="submit" className="submit" value="Register" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
