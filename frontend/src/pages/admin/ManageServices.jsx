// src/pages/admin/ManageServices.jsx
import React, { useEffect, useState } from 'react';
import AdminLayout from './adminLayout';
import axios from 'axios';

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', image: '', detailedContent: '', _id: null });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const res = await axios.get('/api/services');
    setServices(res.data || []);
  };

  const handleSubmit = async () => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('detailedContent', detailedContent);
  formData.append('image', imageFile);

  await axios.post('/api/services/add', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};


  const handleEdit = (service) => {
    setForm(service);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      await axios.delete(`/api/services/${id}`);
      fetchServices();
    }
  };

  const toggleActive = async (id) => {
    await axios.put(`/api/services/toggle/${id}`);
    fetchServices();
  };

  

  return (
    <AdminLayout>
      <div className="text-orange-400">
        <h2 className="text-2xl font-bold mb-4 mt-28">Manage Services</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3 bg-black p-4 border border-orange-400 rounded mb-6">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-2 bg-black border border-orange-400 rounded text-white"
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full p-2 bg-black border border-orange-400 rounded text-white"
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="w-full p-2 bg-black border border-orange-400 rounded text-white"
            required
          />
          <textarea
            placeholder="Detailed Content"
            value={form.detailedContent}
            onChange={(e) => setForm({ ...form, detailedContent: e.target.value })}
            rows="3"
            className="w-full p-2 bg-black border border-orange-400 rounded text-white"
            required
          ></textarea>
          <button type="submit" className="bg-orange-400 text-black px-4 py-2 rounded">
            {form._id ? 'Update Service' : 'Add Service'}
          </button>
        </form>

        {/* List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => (
            <div key={service._id} className="bg-gray-900 text-white p-4 rounded border border-orange-400 relative">
              <img src={service.image} alt={service.title} className="w-full h-32 object-cover rounded mb-2" />
              <h3 className="font-bold text-lg">{service.title}</h3>
              <p>{service.description}</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => handleEdit(service)} className="bg-blue-500 px-3 py-1 rounded text-sm">
                  Edit
                </button>
                <button onClick={() => handleDelete(service._id)} className="bg-red-600 px-3 py-1 rounded text-sm">
                  Delete
                </button>
                <button onClick={() => toggleActive(service._id)} className={`px-3 py-1 rounded text-sm ${service.isActive ? 'bg-green-600' : 'bg-yellow-500'}`}>
                  {service.isActive ? 'Active' : 'Inactive'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageServices;
