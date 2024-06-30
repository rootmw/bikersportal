// src/components/BlogContent.jsx
import React, { useEffect, useState } from 'react';
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const BlogContent = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/api/v1/blog/blogs/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Cache-Control': 'no-cache',
            'pragma': 'no-cache',
            'Expires': '0'
          }
        });
        setBlog(response.data);
        setLikes(response.data.likes);
        setDislikes(response.data.dislikes);
      } catch (error) {
        toast.error("Unable to fetch blog");
      }
    };

    fetchBlog();
  }, [id]);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:8080/api/v1/blog/${id}/like`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Cache-Control': 'no-cache',
          'pragma': 'no-cache',
          'Expires': '0'
        }
      });
      setLikes(likes + 1);
    } catch (error) {
      toast.error("Unable to like blog");
    }
  };

  const handleDislike = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:8080/api/v1/blog/${id}/dislike`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Cache-Control': 'no-cache',
          'pragma': 'no-cache',
          'Expires': '0'
        }
      });
      setDislikes(dislikes + 1);
    } catch (error) {
      toast.error("Unable to dislike blog");
    }
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="blog-content">
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <p>Author: {blog.author.firstname} {blog.author.lastname}</p>
      <div>
      <button onClick={handleLike} style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'blue' }}>
      <FaRegThumbsUp /> {likes}
        </button>
        <button onClick={handleDislike} style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'red' }}>
        <FaRegThumbsDown />{dislikes}
        </button>
      </div>
    </div>
  );
};

export default BlogContent;
