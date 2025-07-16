// src/pages/admin/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from './adminLayout';

const Dashboard = () => {
  const [subscribers, setSubscribers] = useState(0);
  const [services, setServices] = useState(0);
  const [plans, setPlans] = useState(0);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const [subsRes, servRes, plansRes] = await Promise.all([
        axios.get('/api/admin/subscribers'),
        axios.get('/api/services'),
        axios.get('/api/admin/plans')
      ]);

      setSubscribers(subsRes.data.count || subsRes.data.length || 0);
      setServices(servRes.data.length || 0);
      setPlans(plansRes.data.count || plansRes.data.length || 0);
    } catch (err) {
      console.error("Error fetching dashboard stats", err);
    }
  };

  return (
    <AdminLayout>
    <div className="min-h-screen py-4 bg-black text-orange-400 p-6">
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-900 p-6 rounded-2xl shadow-md hover:shadow-orange-500 transition">
          <h2 className="text-lg font-semibold">Total Subscribers</h2>
          <p className="text-3xl mt-2 font-bold">{subscribers}</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-2xl shadow-md hover:shadow-orange-500 transition">
          <h2 className="text-lg font-semibold">Active Services</h2>
          <p className="text-3xl mt-2 font-bold">{services}</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-2xl shadow-md hover:shadow-orange-500 transition">
          <h2 className="text-lg font-semibold">Plans Available</h2>
          <p className="text-3xl mt-2 font-bold">{plans}</p>
        </div>
      </div>

      <p className="text-gray-400">More admin tools coming soon...</p>
    </div>
    </AdminLayout>
  );
};

export default Dashboard;
