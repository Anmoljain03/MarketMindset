import React, { useState } from 'react';
// import axios from '../../api/axios';
import axios from 'axios';
import AdminLayout from './adminLayout';

const AddCategory = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/category', { name });
      alert('Category added successfully');
      setName('');
    } catch (err) {
      console.error(err);
      alert('Failed to add category');
    }
  };

  return (
    <AdminLayout>
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Add Category</h2>
      <input
        type="text"
        placeholder="Enter category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Category
      </button>
    </form>
    </AdminLayout>
  );
};

export default AddCategory;
