import React, {useEffect, useContext} from 'react'
import { Context } from "./index";
import {BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';
import axios from "axios";
import { Toaster} from "react-hot-toast"
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import UpdateProfile from './components/Profile/UpdateProfile';
import GetProfile from './components/Profile/GetProfile';
import Events from './components/Event/Events';
import EventDetails from './components/Event/EventDetails';
import CreateEvent from './components/Event/CreateEvent';
import MyEvents from './components/Event/MyEvents';
import Blogs from './components/Blogs/Blogs';
import MyJoinedEvent from './components/Event/MyJoinedEvent';
import BlogContent from './components/Blogs/BlogContent';



const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchUser = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/v1/profile/getprofile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          });
          console.log(response.data);
          setUser(response.data.user);
          setIsAuthorized(true);
        } catch (error) {
          setIsAuthorized(false);
        }
      };
      fetchUser();
    } else {
      setIsAuthorized(false);
    }
  }, [setIsAuthorized, setUser]);

  return (
    <>
    <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={isAuthorized ? <Home /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isAuthorized ? <GetProfile /> : <Navigate to="/login" />} />
          <Route path="/blogs" element={isAuthorized ? <Blogs /> : <Navigate to="/login" />} />
          <Route path="/blogs/:id" element={isAuthorized ? <BlogContent /> : <Navigate to="/login" />} />
          <Route path="/updateprofile" element={isAuthorized ? <UpdateProfile /> : <Navigate to="/login" />} />
          <Route path="/event/getall" element={isAuthorized ? <Events /> : <Navigate to="/login" />} />
          <Route path="/event/:id" element={isAuthorized ? <EventDetails /> : <Navigate to="/login" />} />
          <Route path="/event/me" element={isAuthorized ? <MyEvents /> : <Navigate to="/login" />} />
          <Route path="/joined" element={isAuthorized ? <MyJoinedEvent /> : <Navigate to="/login" />} />
          <Route path="/event/create" element={isAuthorized ? <CreateEvent /> : <Navigate to="/login" />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Toaster />
      </Router>
      </>

  )
}

export default App
