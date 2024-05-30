import React, { useState } from "react";
import "./../styles/style2.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const redirectToLogin = () => {
    navigate("/register");
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setValues({
      ...values,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.group(values);
    } catch (error) {
      console.log(error);
    }
    navigate("/dashboard");
  };
  return (
    <div>
      <div>
        <div className="wrapper">
          <nav className="nav">
            <div className="nav-logo">
              <p>Biker's Portal</p>
            </div>
          </nav>
          <div className="form-box">
            <div className="login-container" id="login">
              <div className="top">
                <span>
                  Don't have an account?{" "}
                  <a href="/register" onClick={redirectToLogin}>
                    signup
                  </a>
                </span>
                <header>Login</header>
              </div>
              <form action="/login" method="post" onSubmit={handleSubmit}>
                <div className="input-box">
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Username or Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  <i className="bx bx-user" />
                </div>
                <div className="input-box">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className="input-field"
                    placeholder="Password"
                    id="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                  />
                  <i className="bx bx-lock-alt" />
                  <label htmlFor="togglePassword">Show Password</label>
                  <input
                    type="checkbox"
                    id="togglePassword"
                    onChange={togglePasswordVisibility}
                  />
                </div>
                <div className="input-box">
                  <input
                    type="submit"
                    className="submit"
                    defaultValue="Sign In"
                  />
                </div>
                <div className="two-col">
                  <div className="one">
                    <input type="checkbox" id="login-check" />
                    <label htmlFor="login-check"> Remember Me</label>
                  </div>
                  <div className="two"></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
