// src/pages/admin/SubscriberManager.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from './adminLayout';

const SubscriberManager = () => {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    const res = await axios.get('/api/subscriptions');
    setSubscribers(res.data);
  };

  const updateStatus = async (id, newStatus) => {
    await axios.put(`/api/subscriptions/${id}`, { paymentStatus: newStatus });
    fetchSubscribers();
  };

  const deleteSubscriber = async (id) => {
    if (window.confirm('Are you sure you want to delete this subscriber?')) {
      await axios.delete(`/api/subscriptions/${id}`);
      fetchSubscribers();
    }
  };

  return (
    <AdminLayout>
    <div className="bg-black min-h-screen text-orange-400 p-6">
      <h1 className="text-3xl font-bold mb-6">Subscribers</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 rounded overflow-hidden">
          <thead>
            <tr className="text-left text-white">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Plan</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((sub) => (
              <tr key={sub._id} className="border-t border-gray-700">
                <td className="p-3">{sub.name}</td>
                <td className="p-3">{sub.email}</td>
                <td className="p-3">{sub.planType}</td>
                <td className="p-3">{sub.paymentStatus}</td>
                <td className="p-3 space-x-2">
                  {sub.paymentStatus !== 'Completed' && (
                    <button
                      onClick={() => updateStatus(sub._id, 'Completed')}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Mark Completed
                    </button>
                  )}
                  <button
                    onClick={() => deleteSubscriber(sub._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {subscribers.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-white">
                  No subscribers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </AdminLayout>
  );
};

export default SubscriberManager;
