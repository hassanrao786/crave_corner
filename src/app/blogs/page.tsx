'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';

export default function BlogsPage() {
  interface Blog {
    _id: string;
    title: string;
    content: string;
    author: string;
    picture: string;
  }

  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    async function fetchBlogs() {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(data);
    }
    fetchBlogs();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg"
          >
            {blog.picture && (
              <Image
                src={blog.picture}
                alt={blog.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
            )}
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-gray-700 mb-4">
              {blog.content.length > 100
                ? `${blog.content.slice(0, 100)}...`
                : blog.content}
            </p>
            <p className="text-gray-500 text-sm mb-4">Author: {blog.author}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => window.location.href = `/blogs/${blog._id}`}
            >
              Read More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
