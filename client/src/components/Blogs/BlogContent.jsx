// src/components/BlogContent.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const BlogContent = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  

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
      } catch (error) {
        toast.error("Unable to fetch blog");
      }
    };

    fetchBlog();
  }, [id]);

 

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="blog-content">
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <p>Author: {blog.author.firstname} {blog.author.lastname}</p>
      
    </div>
  );
};

export default BlogContent;
