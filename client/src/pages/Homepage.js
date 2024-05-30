import React from "react";

const Homepage = () => {
  return (
    <div className="wrapper">
      <nav className="nav">
        <div className="nav-logo">
          <p>Biker's Portal</p>
        </div>
        <div className="nav-menu" id="navMenu">
          <ul>
            <li>
              <a href="#" className="link active">
                Home
              </a>
            </li>
            <li>
              <a href="blog.html" className="link">
                Blog
              </a>
            </li>
            <li>
              <a href="services.html" className="link">
                Services
              </a>
            </li>
            <li>
              <a href="about.html" className="link">
                About
              </a>
            </li>
          </ul>
        </div>
        <div className="nav-button">
          <button className="btn white-btn" id="loginBtn" onclick="login()">
            <a href="/login">Sign In</a>
          </button>
          <button className="btn" id="registerBtn" onclick="register()">
            <a href="/register">Sign up</a>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Homepage;
