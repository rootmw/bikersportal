import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams,  useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { Context } from "../..";

const EventDetails = () => {
  const { id } = useParams();
  const Navigate = useNavigate();
  const [eventDetails, setEventDetails] = useState({});
  const {user, setuser} = useContext(Context)
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', address: '', contact: '', email: '' });
  const [updateData, setUpdateData] = useState({ eventname: '', eventdescription: '', eventdate: '', eventvenue: '', contact: '', maxParticipants: '' });


  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`http://localhost:8080/api/v1/event/${id}`, {
          headers: {
            'Authorization':`Bearer ${token}`,
            'Cache-Control': 'no-cache',
            'pragma': 'no-cache',
            'Expires': '0'
          }
        });
        setEventDetails(response.data.event);
        setuser(true);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [id,setuser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:8080/api/v1/event/${id}/join`, formData, {
        headers: {
          'Authorization':`Bearer ${token}`,
          'Cache-Control': 'no-cache',
          'pragma': 'no-cache',
          'Expires': '0'
        }
      });
      toast.success(response.data.message);
      setShowJoinForm(false);
      setEventDetails((prevEvent) => ({
        ...prevEvent,
        participantsCount: response.data.event.participantsCount,
      }));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:8080/api/v1/event/update/${id}`, updateData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Cache-Control': 'no-cache',
          'pragma': 'no-cache',
          'Expires': '0'
        }
      });
      toast.success(response.data.message);
      setShowUpdateForm(false);
      setEventDetails(response.data.event);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:8080/api/v1/event/delete/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Cache-Control': 'no-cache',
          'pragma': 'no-cache',
          'Expires': '0'
        }
      });
      toast.success(response.data.message);
      Navigate('/event/getall'); 
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="event-details">
      <h3>{eventDetails.eventname}</h3>
      <p>{eventDetails.eventdescription}</p>
      <p>Event Date: {eventDetails.eventdate}</p>
      <p>Venue: {eventDetails.eventvenue}</p>
      <p>Contact: {eventDetails.contact}</p>
      <p>Max Participants{eventDetails.maxParticipants}</p>
      <p>Participants: {eventDetails.participantsCount}</p>
      {user && user.role === "user" && (
      <button onClick={() => setShowJoinForm(!showJoinForm)}>Join</button>
      )}
      {user && user.role === "creator" && (
        <div>
        <button onClick={() => {
          setShowUpdateForm(!showUpdateForm);
          setUpdateData({
            eventname: eventDetails.eventname,
            eventdescription: eventDetails.eventdescription,
            eventdate: eventDetails.eventdate,
            eventvenue: eventDetails.eventvenue,
            contact: eventDetails.contact,
            maxParticipants: eventDetails.maxParticipants,
          });
        }}>Update</button>
        <button id="btn-delete" onClick={handleDelete} style={{ marginLeft: '10px' }}>Delete</button>
        </div>
      )}
          {showJoinForm && (
            <form onSubmit={handleJoin}>
              <div>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div>
                <label>Address:</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} required />
              </div>
              <div>
                <label>Contact:</label>
                <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />
              </div>
              <div>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <button type="submit">Confirm Join</button>
            </form>
          )}
          {showUpdateForm && (
        <form onSubmit={handleUpdate}>
          <div>
            <label>Event Name:</label>
            <input type="text" name="eventname" value={updateData.eventname} onChange={handleUpdateChange} required />
          </div>
          <div>
            <label>Event Description:</label>
            <input type="text" name="eventdescription" value={updateData.eventdescription} onChange={handleUpdateChange} required />
          </div>
          <div>
            <label>Event Date:</label>
            <input type="datetime-local" name="eventdate" value={updateData.eventdate} onChange={handleUpdateChange} required />
          </div>
          <div>
            <label>Venue:</label>
            <input type="text" name="eventvenue" value={updateData.eventvenue} onChange={handleUpdateChange} required />
          </div>
          <div>
            <label>Contact:</label>
            <input type="text" name="contact" value={updateData.contact} onChange={handleUpdateChange} required />
          </div>
          <div>
            <label>Max Participants:</label>
            <input type="number" name="maxParticipants" value={updateData.maxParticipants} onChange={handleUpdateChange} required />
          </div>
          <button type="submit">Update Event</button>
        </form>
      )}
    </div>
  );
};

export default EventDetails;