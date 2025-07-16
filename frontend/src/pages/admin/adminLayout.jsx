// src/components/admin/AdminLayout.jsx
import { useState } from 'react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import LogoutButton from './LogoutButton';



const AdminLayout = ({ children }) => {
  const location = useLocation();
  const [strategyOpen, setStrategyOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Manage Services', path: '/admin/services' },
    { name: 'Manage Plans', path: '/admin/plans' },
    { name: 'Subscribers', path: '/admin/subscriptions' },
    { name: 'Blogs', path: '/admin/add-blog' },
    { name: 'Add category', path: '/admin/category' },
    { name: 'Add strategy', path: '/admin/add-strategy' },
    { name: 'Add sub-category', path: '/admin/subcategory' },
    { name: 'Indicators', path: '/admin/indicators' },
  ];

  return (
    <div className="flex min-h-screen bg-black text-orange-400">
      {/* Sidebar */}
      <div className="w-64 p-6 py-10 bg-gray-900 border-r border-gray-700">
        <h1 className="text-2xl font-bold mb-8 text-orange-400">Admin Panel</h1>
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`block px-4 py-2 rounded hover:bg-orange-500 hover:text-black transition ${
                  location.pathname === item.path ? 'bg-orange-400 text-black font-semibold' : ''
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}

          {/* Strategies Dropdown */}
          <li>
            <button
              onClick={() => setStrategyOpen(!strategyOpen)}
              className="w-full text-left px-4 py-2 rounded hover:bg-orange-500 hover:text-black transition"
            >
              Strategies ▾
            </button>
            {strategyOpen && (
              <ul className="pl-4 space-y-2 mt-2">
                <li>
                  <Link
                    to="/admin/strategy"
                    className={`block px-2 py-1 rounded hover:bg-orange-400 hover:text-black transition ${
                      location.pathname === '/admin/strategy' ? 'bg-orange-400 text-black font-semibold' : ''
                    }`}
                  >
                    View All
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/viewcontentadmin"
                    className={`block px-2 py-1 rounded hover:bg-orange-400 hover:text-black transition ${
                      location.pathname === '/admin/viewcontentadmin' ? 'bg-orange-400 text-black font-semibold' : ''
                    }`}
                  >
                    Edit View Content
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* QR Code Manager */}
          <li>
            <Link
              to="/admin/qr-manager"
              className={`block px-4 py-2 rounded hover:bg-orange-500 hover:text-black transition ${
                location.pathname === '/admin/qr-manager' ? 'bg-orange-400 text-black font-semibold' : ''
              }`}
            >
              QR Code Manager
            </Link>
          </li>

          {/* Logout */}
          <LogoutButton />
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
};

export default AdminLayout;
