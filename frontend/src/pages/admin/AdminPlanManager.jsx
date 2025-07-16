// AdminPlanManager.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from './adminLayout';

const AdminPlanManager = () => {
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState({ type: '', price: '', description: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    const res = await axios.get('/api/plans');
    setPlans(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`/api/plans/${editId}`, form);
    } else {
      await axios.post('http://localhost:5000/api/plans', form);

    }
    setForm({ type: '', price: '', description: '' });
    setEditId(null);
    fetchPlans();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/plans/${id}`);
    fetchPlans();
  };

  const handleEdit = (plan) => {
    setEditId(plan._id);
    setForm({ type: plan.type, price: plan.price, description: plan.description });
  };

  return (
    <AdminLayout>
    <div className="bg-black py-42 text-orange-400 min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-4">Plan Management</h2>

      <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded mb-6">
        <div className="flex gap-4 mb-2">
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} required className="bg-black border border-orange-400 px-4 py-2 rounded w-1/3">
            <option value="">Select Type</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="bg-black border border-orange-400 px-4 py-2 rounded w-1/3"
            required
          />
        </div>
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full bg-black border border-orange-400 px-4 py-2 rounded"
          required
        />
        <button type="submit" className="mt-3 bg-orange-400 text-black font-semibold px-4 py-2 rounded">
          {editId ? 'Update Plan' : 'Add Plan'}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plans.map((plan) => (
          <div key={plan._id} className="bg-gray-800 p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{plan.type}</h3>
            <p>₹{plan.price}</p>
            <p className="text-sm mt-1">{plan.description}</p>
            <div className="mt-3 flex gap-2">
              <button onClick={() => handleEdit(plan)} className="bg-orange-400 text-black px-3 py-1 rounded">Edit</button>
              <button onClick={() => handleDelete(plan._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </AdminLayout>
  );
};

export default AdminPlanManager;
