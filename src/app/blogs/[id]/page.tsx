'use client';

import React, { useEffect, useState } from 'react';

export default function BlogDetails({ params }: { params: { id: string } }) {
  const { id } = params;

  interface Blog {
    _id: string;
    title: string;
    content: string;
    author: string;
    picture: string;
  }

  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    async function fetchBlog() {
      const res = await fetch(`/api/blogs/${id}`);
      if (res.ok) {
        const data = await res.json();
        setBlog(data);
      } else {
        console.error('Failed to fetch the blog.');
      }
    }
    fetchBlog();
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      {blog.picture && (
        <img
          src={blog.picture}
          alt={blog.title}
          className="w-full h-96 object-cover rounded-md mb-4"
        />
      )}
      <p className="text-gray-700 mb-4">{blog.content}</p>
      <p className="text-gray-500 text-sm">Author: {blog.author}</p>
    </div>
  );
}
