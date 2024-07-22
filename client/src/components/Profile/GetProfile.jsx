import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../../index";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const GetProfile = () => {
  const { isAuthorized, user, setUser } = useContext(Context);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token')
        const {data} = await axios.get("https://bikersportal-backend1.onrender.com/api/v1/profile/getprofile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setUser(data.user);
        console.log(data.user)
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    if (isAuthorized) {
      fetchProfile();
    }
  }, [isAuthorized, setUser]);

  

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  return (
    <>
    <section className="profilePage">
      <div className="container">
        <div className="header">
          <h1 className="profileTitle">User Profile</h1>
        </div>
        <div className="profileDetails">
          <p><span className="label">Username:</span> {user.username}</p>
          <p><span className="label">Email:</span> {user.email}</p>
          <p><span className="label">Age:</span> {user.age}</p>
          <p><span className="label">Mobile No:</span> {user.mobile_No}</p>
          <p><span className="label">Bio:</span> {user.bio}</p>
          <p><span className="label">Address:</span> {user.address}</p>
          
        </div>
        <Link to="/updateprofile" className="updateProfileLink">
          Update Profile
        </Link>
      </div>
    </section>
    </>
  );
};

export default GetProfile;
