import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Context } from "../../index";
import { Navigate, useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const { isAuthorized, user, setUser } = useContext(Context);
  const [formData, setFormData] = useState({
    username: "",
    age: "",
    mobile_No: "",
    bio: "",
    address: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        age: user.age || "",
        mobile_No: user.mobile_No || "",
        bio: user.bio || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value});
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);


    try {
      const token= localStorage.getItem('token')
      const response = await axios.put(
        "http://localhost:8080/api/v1/profile/updateprofile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success("Profile updated successfully");
      setUser(response.data.user);
      navigate("/profile")
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  return (
    <>
    <section className="profilePage-1">
      <div className="container">
        <div className="header">
          <h1>Edit Profile</h1>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="inputTag">
            <label> Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="inputTag">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className="inputTag">
            <label>Mobile No</label>
            <input
              type="text"
              name="mobile_No"
              value={formData.mobile_No}
              onChange={handleChange}
            />
          </div>
          <div className="inputTag">
            <label>Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="inputTag">
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
            ></textarea>
          </div>
          <button className="button" type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </section>
    </>
  );
};

export default UpdateProfile;
