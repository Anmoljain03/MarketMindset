import React, { useState } from 'react';
import axios from 'axios';
import AdminLayout from './adminLayout';

const categories = ['Basics', 'Strategies', 'Technical Analysis', 'Market News', 'Crypto'];

const AddBlog = () => {
  const [formData, setFormData] = useState({
    image: '',
    date: '',
    title: '',
    description: '',
    content: '',
    category: '',
    link: '',
    author: '',
    shortLinks: [],
    shareLinks: {
      facebook: '',
      twitter: '',
      linkedin: '',
      whatsapp: '',
    },
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleShareLinks = (e) => {
    setFormData({
      ...formData,
      shareLinks: {
        ...formData.shareLinks,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post('http://localhost:5000/api/blogs', formData);
      if (res.status === 201) {
        setMessage('✅ Blog added successfully!');
        setFormData({
          image: '',
          date: '',
          title: '',
          description: '',
          content: '',
          category: '',
          link: '',
          author: '',
          shortLinks: [],
          shareLinks: {
            facebook: '',
            twitter: '',
            linkedin: '',
            whatsapp: '',
          },
        });
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to add blog. Please try again.');
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-black text-white px-4 py-12 md:px-10">
        <h2 className="text-3xl font-bold text-orange-500 mb-10">📝 Add New Blog</h2>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">

          {/* Image URL */}
          <div>
            <label className="block mb-1 font-semibold">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full bg-neutral-800 border border-neutral-700 p-3 rounded"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="block mb-1 font-semibold">Date</label>
            <input
              type="text"
              name="date"
              placeholder="e.g. May 19, 2025"
              value={formData.date}
              onChange={handleChange}
              className="w-full bg-neutral-800 border border-neutral-700 p-3 rounded"
              required
            />
          </div>

          {/* Title */}
          <div>
            <label className="block mb-1 font-semibold">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-neutral-800 border border-neutral-700 p-3 rounded"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-semibold">Short Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full bg-neutral-800 border border-neutral-700 p-3 rounded"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 font-semibold">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-neutral-800 border border-neutral-700 p-3 rounded"
              required
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Link */}
          <div>
            <label className="block mb-1 font-semibold">Blog Page Route</label>
            <input
              type="text"
              name="link"
              placeholder="e.g. /blogpages/title"
              value={formData.link}
              onChange={handleChange}
              className="w-full bg-neutral-800 border border-neutral-700 p-3 rounded"
              required
            />
          </div>

          {/* Full Content */}
          <div>
            <label className="block mb-1 font-semibold">Full Blog Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={10}
              className="w-full bg-neutral-800 border border-neutral-700 p-3 rounded"
              required
            />
          </div>

          {/* Author */}
          <div>
            <label className="block mb-1 font-semibold">Author</label>
            <input
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Author Name"
              className="w-full bg-neutral-800 border border-neutral-700 p-3 rounded"
              required
            />
          </div>

          {/* Short Links */}
          <div>
            <label className="block mb-1 font-semibold">Short Links</label>
            <textarea
              name="shortLinks"
              value={formData.shortLinks.join(',')}
              placeholder="Comma-separated URLs"
              onChange={(e) =>
                setFormData({ ...formData, shortLinks: e.target.value.split(',') })
              }
              rows={3}
              className="w-full bg-neutral-800 border border-neutral-700 p-3 rounded"
            />
            <p className="text-sm text-gray-400 mt-1">Example: https://example1.com, https://example2.com</p>
          </div>

          {/* Share Links */}
          <div>
            <label className="block mb-2 font-semibold">Share Links</label>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="facebook"
                placeholder="Facebook URL"
                value={formData.shareLinks.facebook}
                onChange={handleShareLinks}
                className="bg-neutral-800 border border-neutral-700 p-3 rounded"
              />
              <input
                name="twitter"
                placeholder="Twitter URL"
                value={formData.shareLinks.twitter}
                onChange={handleShareLinks}
                className="bg-neutral-800 border border-neutral-700 p-3 rounded"
              />
              <input
                name="linkedin"
                placeholder="LinkedIn URL"
                value={formData.shareLinks.linkedin}
                onChange={handleShareLinks}
                className="bg-neutral-800 border border-neutral-700 p-3 rounded"
              />
              <input
                name="whatsapp"
                placeholder="WhatsApp URL"
                value={formData.shareLinks.whatsapp}
                onChange={handleShareLinks}
                className="bg-neutral-800 border border-neutral-700 p-3 rounded"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-black font-semibold px-6 py-3 rounded transition"
          >
            Add Blog
          </button>

          {/* Message */}
          {message && <p className="mt-4 text-sm text-green-400">{message}</p>}
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddBlog;
