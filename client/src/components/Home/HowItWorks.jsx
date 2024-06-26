import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";


const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How Bikers Portal Works</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p>Create Account</p>
              <p>
              Create an account as user to Join an event
                Or 
                Create an account as creator to Create an event
              </p>
            </div>
            <div className="card">
              <MdFindInPage />
              <p>join a event/create a event</p>
              <p>
                Login as User to Join an Event Or Login as Creator to Post an Event
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;