import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('/api/admin/login', { email, password });
      localStorage.setItem('adminToken', res.data.token);
      window.location.href = '/admin/dashboard'; // redirect
    } catch (err) {
      alert(err.response.data.error || 'Login failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="p-2 mb-2 text-black" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="p-2 mb-2 text-black" />
      <button onClick={handleLogin} className="bg-blue-600 px-4 py-2 rounded">Login</button>
    </div>
  );
};

export default AdminLogin;
