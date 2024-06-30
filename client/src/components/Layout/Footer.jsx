import React, { useContext } from "react";
import { Context } from "../../index";
import { Link } from "react-router-dom";
import {  FaYoutube, FaLinkedin, FaGithub } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; 2024 All Rights Reserved </div>
      <div>
        <Link to={"https://github.com/rootmw"} target="_blank">
          <FaGithub /> 
        </Link>
        <Link to={"https://www.youtube.com/"} target="_blank">
          <FaYoutube />
        </Link>
        <Link to={"https://www.linkedin.com/in/manthanwaghmare"} target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={"https://www.instagram.com/manthan_waghmare/"} target="_blank">
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;