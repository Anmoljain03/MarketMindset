import React, { useState, useEffect } from 'react';
// import axios from '../../api/axios';
import axios from 'axios';
import AdminLayout from './adminLayout';

const AddStrategy = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    subCategoryId: '',
    isPremium: false,
    image: '',
    shareLink: '',
  });

  useEffect(() => {
    const fetchSubCategories = async () => {
      const res = await axios.get('/api/admin/subcategory'); // You’ll need to implement this
      setSubCategories(res.data);
    };
    fetchSubCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();
  data.append('title', formData.title);
  data.append('description', formData.description);
  data.append('price', formData.price);
  data.append('subCategoryId', formData.subCategoryId);
  data.append('isPremium', formData.isPremium);
  data.append('shareLink', formData.shareLink);

  if (imageFile) {
    data.append('image', imageFile);
  }

  try {
    await axios.post('/api/admin/strategy', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    alert('Strategy added!');
    // Reset form
    setFormData({
      title: '',
      description: '',
      price: '',
      subCategoryId: '',
      isPremium: false,
      shareLink: '',
    });
    setImageFile(null);
  } catch (err) {
    console.error(err);
    alert('Failed to add strategy');
  }
};


  return (
    <AdminLayout>
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <h2 className="text-xl font-semibold">Add Strategy</h2>
      <select
        name="subCategoryId"
        value={formData.subCategoryId}
        onChange={handleChange}
        className="border p-2 rounded w-full"
        required
      >
        <option value="">Select Sub-Category</option>
        {subCategories.map((sub) => (
          <option key={sub._id} value={sub._id}>
            {sub.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="title"
        placeholder="Strategy title"
        value={formData.title}
        onChange={handleChange}
        className="border p-2 rounded w-full"
        required
      />
      <input
  type="file"
  accept="image/*"
  onChange={(e) => setImageFile(e.target.files[0])}
  className="block w-full"
/>
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="border p-2 rounded w-full"
        required
      />
      <input
  type="text"
  name="shareLink"
  placeholder="Optional Share Link"
  value={formData.shareLink || ''}
  onChange={handleChange}
  className="border p-2 rounded w-full"
/>
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isPremium"
          checked={formData.isPremium}
          onChange={handleChange}
        />
        Premium Strategy?
      </label>
      <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">
        Add Strategy
      </button>
    </form>
    </AdminLayout>
  );
};

export default AddStrategy;
