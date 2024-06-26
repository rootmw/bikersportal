import React, { useContext,  useState } from "react";
import { Context } from "../../index";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiChevronDown} from "react-icons/fi";


const Navbar = () => {

  const [show, setShow] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
  const navigateTo = useNavigate();

   const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/api/v1/auth/logout", {}, {
        withCredentials: true
      });
      setIsAuthorized(false);
      setUser(null);
      toast.success("Logged out successfully");
      navigateTo('/login');
    } catch (error) {
      toast.error("Logout failed");
    }
  };
  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="logo">
          <h1>Biker's Portal</h1>
        </div>
        <ul className={!show ? "menu" : "show-menu menu"}>
          <li>
            <Link to={"/"} onClick={() => setShow(false)}>
              HOME
            </Link>
          </li>
          <li>
            <Link to={"/profile"} onClick={() => setShow(false)}>
              PROFILE
            </Link>
          </li>
          <li>
            <Link to={"/blogs"} onClick={() => setShow(false)}>
              BLOGS
            </Link>
          </li>
          <li className="dropdown">
            <div className="dropdown-text" onClick={toggleDropdown}>
                ALL EVENTS <FiChevronDown/>
            </div>
            {dropdown && (
              <ul className={`dropdown-menu ${dropdown ? "show" : ""}`}>
              <li>
                <Link to={"/event/getall"} onClick={() => { setShow(false); setDropdown(false); }}>
                  All Events
                </Link>
              </li>
              {user && user.role === "user" && (
                <>
                <li>
                  <Link to={"/applications/me"} onClick={() => { setShow(false); setDropdown(false); }}>
                    MY JOINED EVENTS
                  </Link>
                </li>
                </>
              )}
              {user && user.role === "creator" && (
                <>
                  <li>
                    <Link to={"/event/create"} onClick={() => { setShow(false); setDropdown(false); }}>
                      CREATE NEW EVENT
                    </Link>
                  </li>
                  <li>
                    <Link to={"/event/me"} onClick={() => { setShow(false); setDropdown(false); }}>
                      VIEW YOUR EVENTS
                    </Link>
                  </li>
                </>
              )}
            </ul>
          )}
        </li>
        <button onClick={handleLogout}>LOGOUT</button>
      </ul>
      <div className="hamburger">
        <GiHamburgerMenu onClick={() => setShow(!show)} />
      </div>
    </div>
  </nav>
);
};

export default Navbar;