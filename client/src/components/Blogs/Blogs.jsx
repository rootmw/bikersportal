import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';
import { Context } from "../..";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

const Blogs = () => {
  const { id } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const { user } = useContext(Context);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token= localStorage.getItem('token')
        const response = await axios.get('http://localhost:8080/api/v1/blog/blogs', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            'Cache-Control': 'no-cache',
            'pragma': 'no-cache',
            'Expires': '0'
          }
        });
        if (Array.isArray(response.data)) {
          setBlogs(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const token= localStorage.getItem('token')
      const response = await axios.post('http://localhost:8080/api/v1/blog/blogs', formData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache',
          'pragma': 'no-cache',
          'Expires': '0'
        }
      });
      toast.success(response.data.message);
      setShowForm(false);
      setBlogs((prevBlogs) => [...prevBlogs, response.data.blog]);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleLike = async (blogId) => {
    try {
      const token= localStorage.getItem('token')
      const response = await axios.post(`http://localhost:8080/api/v1/blog/blogs/${blogId}/like`, {}, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache',
          'pragma': 'no-cache',
          'Expires': '0'
        }
      });
      toast.success(response.data.message);
      setBlogs((prevBlogs) => prevBlogs.map(blog => blog._id === blogId ? { ...blog, likes: blog.likes + 1, dislikes: blog.dislikes } : blog));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDislike = async (blogId) => {
    try {
      const token= localStorage.getItem('token')
      const response = await axios.post(`http://localhost:8080/api/v1/blog/blogs/${blogId}/dislike`, {}, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache',
          'pragma': 'no-cache',
          'Expires': '0'
        }
      });
      toast.success(response.data.message);
      setBlogs((prevBlogs) => prevBlogs.map(blog => blog._id === blogId ? { ...blog, dislikes: blog.dislikes + 1, likes: blog.likes +1} : blog));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="blogs">
      <h1>Blogs</h1>
      <div className="blog-list">
        {blogs.length > 0 ? (
          blogs.map(blog => (
            <div key={blog._id} className="blog-card">
              <h2><Link to={`/blogs/${blog._id}`}>{blog.title}</Link></h2>
              <p>Author: {blog.author.firstname} {blog.author.lastname}</p>
              <p>Date: {new Date(blog.createdAt).toLocaleDateString()}</p>
              <div className="blog-actions">
                <button id="btn-like" onClick={() => handleLike(blog._id)}>
                  <FontAwesomeIcon icon={faThumbsUp} /> {blog.likes}
                </button>
                <button id="btn-dislike" onClick={() => handleDislike(blog._id)}>
                  <FontAwesomeIcon icon={faThumbsDown} /> {blog.dislikes}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No blogs available.</p>
        )}
      </div>
      {user && user.role === "user" && (
        <button onClick={() => setShowForm(!showForm)}>Write a Blog</button>
      )}
      {showForm && (
        <form onSubmit={handlePost}>
          <div>
            <label>Title:</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div>
            <label>Content:</label>
            <textarea name="content" value={formData.content} onChange={handleChange} required />
          </div>
          <button type="submit">Post Blog</button>
        </form>
      )}
    </div>
  );
};

export default Blogs;
