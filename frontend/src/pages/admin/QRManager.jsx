// QRManager.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from './adminLayout';

const QRManager = () => {
  const [qrUrl, setQrUrl] = useState('');
  const [newQr, setNewQr] = useState(null);

  useEffect(() => {
    fetchQR();
  }, []);

const fetchQR = async () => {
  try {
    const res = await axios.get('/api/services/qr');
    if(res.data?.qrCodeUrl) {
      setQrUrl(`http://localhost:5000${res.data.qrCodeUrl}`);
    }
  } catch(err) {
    console.error("Failed to fetch QR code", err);
  }
};


 const handleUpload = async () => {
  if (!newQr) return;

  try {
    const formData = new FormData();
    formData.append('qrImage', newQr);

    const res = await axios.post('/api/services/qr/upload', formData);
    if (res.status === 200) {
      fetchQR();  // Refresh image URL
      setNewQr(null);
    }
  } catch (err) {
    console.error('Upload failed', err);
  }
};

  <img
  src={`${qrUrl}?t=${Date.now()}`}
  alt="QR Code"
  className="w-40 h-40 object-contain bg-white p-2 rounded"
/>



  return (
    <AdminLayout>
    <div className="bg-black text-orange-400 min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-4">QR Code Manager</h2>

    {qrUrl && (
  <div className="mb-4">
    <img
      src={`${qrUrl}?t=${Date.now()}`}
      alt="QR Code"
      className="w-40 h-40 object-contain bg-white p-2 rounded"
    />
  </div>
)}

      <div className="bg-gray-800 p-4 rounded">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewQr(e.target.files[0])}
          className="bg-black text-white mb-3"
        />
        <button onClick={handleUpload} className="bg-orange-400 text-black px-4 py-2 rounded">
          Upload New QR Code
        </button>
      </div>
    </div>
    </AdminLayout>
  );
};

export default QRManager;
