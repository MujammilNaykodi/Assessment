import React, { useState, useEffect, useRef } from "react";
import "../style/post.css"; // Ensure you have styles
import { motion } from "framer-motion"; // For animations

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const loaderRef = useRef(null);

  // Function to fetch posts
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`);
      if (!res.ok) throw new Error("Failed to load posts");
      const data = await res.json();
      setPosts((prev) => [...prev, ...data]); // Append new posts
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch posts when page changes
  useEffect(() => {
    fetchPosts();
  }, [page]);

  // Infinite Scroll - Trigger new page load
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [loading]);

  return (
    <div className="posts-container">
      <h1></h1>
      {error && <p className="error">{error}</p>}
      
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          className="post-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </motion.div>
      ))}

      {/* Loader */}
      <div ref={loaderRef} className="loader">
        {loading && <p>Loading more posts...</p>}
      </div>
    </div>
  );
};

export default Posts;
