import React, { useEffect, useState } from 'react';
// import axios from '../../api/axios';
import axios from 'axios';
import AdminLayout from './adminLayout';

const AddSubCategory = () => {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get('/api/admin/category'); // You’ll need to implement this API
      setCategories(res.data);
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/subcategory', {
        name,
        categoryId: selectedCategoryId,
      });
      alert('Sub-category added!');
      setName('');
    } catch (err) {
      console.error(err);
      alert('Failed to add sub-category');
    }
  };

  return (
    <AdminLayout>
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <h2 className="text-xl font-semibold">Add Sub-Category</h2>
      <select
        value={selectedCategoryId}
        onChange={(e) => setSelectedCategoryId(e.target.value)}
        className="border p-2 rounded w-full"
        required
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Sub-category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Add Sub-Category
      </button>
    </form>
    </AdminLayout>
  );
};

export default AddSubCategory;
