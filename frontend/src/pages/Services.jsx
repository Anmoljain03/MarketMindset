// ServicePage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const ServicePage = () => {
  const [services, setServices] = useState([]);
  const [qr, setQr] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showQR, setShowQR] = useState(false);
const [selectedPlan, setSelectedPlan] = useState('');
const [formData, setFormData] = useState({ name: '', email: '' });
const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetchServices();
    fetchQR();
  }, []);

  const fetchServices = async () => {
    const res = await axios.get('/api/services');
     if (Array.isArray(res.data)) {
  setServices(res.data);
} else {
  console.error('Expected array but got:', res.data);
}

  };

 const fetchQR = async () => {
  try {
    const res = await axios.get('/api/services/qr');
    if (res.data?.qrCodeUrl) {
      setQr(`http://localhost:5000${res.data.qrCodeUrl}`);
    }
  } catch (err) {
    console.error('Failed to fetch QR code', err);
  }
};


  const handleServiceClick = (service) => {
    setSelectedService(service);
    setShowPopup(true);
  };

  const handleSubscribeClick = (plan) => {
  setSelectedPlan(plan);
  setShowQR(true);
};

const handleFormSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('/api/subscriptions/add', {
      ...formData,
      planType: selectedPlan,
    });
    alert('Subscribed successfully!');
    setShowQR(false);
    setFormData({ name: '', email: '' });
  } catch (err) {
    alert('Error subscribing.');
  }
};

useEffect(() => {
  const fetchPlans = async () => {
    const res = await axios.get('/api/plans'); // ✅ Use relative path
    setPlans(res.data);
  };

  fetchPlans();
}, []);



  return (
     <div className="bg-black py-36 min-h-screen text-white">
      <motion.div
        className="relative h-64 w-full"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src="/images/servicebanner.jpg"
          alt="Services Banner"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.h1
            className="text-4xl font-bold text-orange-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Our Services
          </motion.h1>
          <p className="text-white mt-2 text-lg">Explore plans & services tailored just for you</p>
        </div>
      </motion.div>

      {/* Plans */}
      <div className="px-6 py-12">
        <div className="flex flex-col md:flex-row gap-6 justify-center mb-10">
          {plans.map((plan, index) => (
            <motion.div
              key={plan._id}
              className="p-6 bg-gray-900 border border-gray-700 rounded-lg w-full md:w-1/3 min-h-[220px] flex flex-col justify-between shadow-md hover:shadow-lg transition"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div>
                <h3 className="text-xl font-bold mb-1 text-orange-400">{plan.type} Plan</h3>
                <p className="mb-2 text-white">₹{plan.price}</p>
                <p className="text-sm text-gray-300">{plan.description}</p>
              </div>
              <button
                onClick={() => handleSubscribeClick(plan.type)}
                className="mt-4 bg-orange-400 text-black px-4 py-2 rounded hover:bg-orange-300 transition"
              >
                Subscribe
              </button>
            </motion.div>
          ))}
        </div>

        {/* QR Modal */}
        {showQR && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <motion.div
              className="bg-white text-black p-6 rounded-lg max-w-md w-full relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <button onClick={() => setShowQR(false)} className="absolute top-2 right-2 text-red-600 font-bold">X</button>
              <h2 className="text-xl font-bold mb-2">{selectedPlan} Plan</h2>
              <img src={qr} alt="QR Code" className="w-full h-40 object-contain mb-4" />
              <form onSubmit={handleFormSubmit}>
                <input type="text" placeholder="Name" value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full mb-2 p-2 border rounded" required />
                <input type="email" placeholder="Email" value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full mb-2 p-2 border rounded" required />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
              </form>
            </motion.div>
          </div>
        )}

        {/* Services Heading */}
        <motion.h2
          className="text-2xl font-bold text-orange-400 mt-12 mb-6 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Services We Provide
        </motion.h2>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service._id}
              className="relative p-5 bg-gray-800 rounded-lg cursor-pointer hover:shadow-xl hover:scale-[1.02] transition"
              onClick={() => handleServiceClick(service)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-52 object-cover rounded mb-2"
              />
              <p className="text-orange-400 font-semibold text-center">{service.title}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Popup */}
      {showPopup && selectedService && (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4 sm:px-6">
    <motion.div
      className="bg-white text-black rounded-lg w-full max-w-lg sm:max-w-2xl md:max-w-5xl md:mt-8 relative shadow-lg"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Close Button */}
      <button
        onClick={() => setShowPopup(false)}
        className="absolute top-2 right-2 text-orange-500 font-bold text-xl focus:outline-none"
      >
        ×
      </button>

      {/* Modal Content */}
      <div className="p-4 sm:p-6">
        <img
          src={selectedService.image}
          alt={selectedService.title}
          className="w-full h-48 sm:h-60 md:h-72 object-cover rounded mb-4"
        />

        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-orange-500 mb-2">
          {selectedService.title}
        </h2>

        <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
          {selectedService.detailedContent}
        </p>
      </div>
    </motion.div>
  </div>
)}

    </div>
  );
};

export default ServicePage;
