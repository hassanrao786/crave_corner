'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminBlogs() {
  interface Blog {
    _id: string;
    title: string;
    content: string;
    author: string;
    picture?: string;
  }

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [editBlogId, setEditBlogId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', author: '', picture: '' });
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for pop-up
  const router = useRouter();

  useEffect(() => {
    async function fetchBlogs() {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(data);
    }
    fetchBlogs();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddBlog = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const res = await fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const newBlog = await res.json();
      setBlogs((prev) => [newBlog, ...prev]);
      setShowAddForm(false);
      setFormData({ title: '', content: '', author: '', picture: '' });
      setSuccessMessage('Blog is added successfully!');
    } else {
      console.error('Failed to add blog');
    }
  };

  const handleEdit = (blog: Blog): void => {
    setEditBlogId(blog._id);
    setFormData({ title: blog.title, content: blog.content, author: blog.author, picture: blog.picture || '' });
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!editBlogId) return;

    const res = await fetch(`/api/blogs/${editBlogId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const updatedBlog = await res.json();
      setBlogs((prev) => prev.map((blog) => (blog._id === editBlogId ? updatedBlog : blog)));
      setEditBlogId(null);
      setFormData({ title: '', content: '', author: '', picture: '' });
      setSuccessMessage('Blog is updated successfully!');

     
    } else {
      console.error('Failed to update blog');
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      setSuccessMessage('Blog is deleted successfully!');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel - Manage Blogs</h1>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {successMessage}
          <button
            onClick={() => setSuccessMessage(null)}
            className="ml-4 text-sm text-green-900 underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {!showAddForm && !editBlogId && (
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-green-500 text-white px-4 py-2 mb-4"
        >
          Add Blog
        </button>
      )}

      {/* Add Blog Form */}
      {showAddForm && (
        <form onSubmit={handleAddBlog} className="mb-6">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="block mb-2 p-2 border"
          />
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Content"
            className="block mb-2 p-2 border"
          />
          <input
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author"
            className="block mb-2 p-2 border"
          />
          <input
            name="picture"
            value={formData.picture}
            onChange={handleChange}
            placeholder="Picture URL"
            className="block mb-2 p-2 border"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 mr-2">Submit</button>
          <button
            type="button"
            onClick={() => setShowAddForm(false)}
            className="bg-gray-500 text-white px-4 py-2"
          >
            Cancel
          </button>
        </form>
      )}

      {/* Edit Blog Form */}
      {editBlogId && (
        <form onSubmit={handleUpdate} className="mb-6">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="block mb-2 p-2 border"
          />
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Content"
            className="block mb-2 p-2 border"
          />
          <input
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author"
            className="block mb-2 p-2 border"
          />
          <input
            name="picture"
            value={formData.picture}
            onChange={handleChange}
            placeholder="Picture URL"
            className="block mb-2 p-2 border"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 mr-2">Update</button>
          <button
            type="button"
            onClick={() => setEditBlogId(null)}
            className="bg-gray-500 text-white px-4 py-2"
          >
            Cancel
          </button>
        </form>
      )}

      {/* Blog List */}
      {!editBlogId &&
        blogs.map((blog) => (
          <div key={blog._id} className="mb-4 border-b pb-4">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-gray-700">{blog.content ? blog.content.substring(0, 100) : 'No content available'}...</p>
            <p className="text-gray-500 text-sm">Author: {blog.author}</p>
            {blog.picture && <img src={blog.picture} alt={blog.title} className="w-20 h-20 object-cover mt-2" />}
            <div className="mt-2">
              <button
                onClick={() => handleEdit(blog)}
                className="bg-yellow-500 text-white px-4 py-2 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog._id)}
                className="bg-red-500 text-white px-4 py-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
