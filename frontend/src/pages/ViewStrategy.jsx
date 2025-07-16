import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const ViewStrategy = ({ id }) => {
  const [strategy, setStrategy] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [showFormModal, setShowFormModal] = useState(false);

  useEffect(() => {
    const fetchStrategy = async () => {
      try {
        const res = await axios.get(`/api/admin/strategy/${id}`);
        setStrategy(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStrategy();
  }, [id]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setShowFormModal(false);
      setShowContent(true);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const loaded = await loadRazorpayScript();
    if (!loaded) return alert("Failed to load Razorpay SDK");

    try {
      const res = await axios.post("http://localhost:5000/api/payment/create-order", {
        amount: strategy.price,
      });

      const { amount, currency, id: order_id } = res.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount,
        currency,
        order_id,
        name: "Myriad",
        description: "Premium Strategy Unlock",
        image: "https://yourdomain.com/logo.png",
        handler: function (response) {
          alert("Payment Success");
          setShowContent(true);
        },
        prefill: {
          name: formData.name || "User",
          email: formData.email || "email@example.com",
        },
        theme: {
          color: "#F97316",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Something went wrong while processing payment.");
    }
  };

  if (loading) return <div className="text-white text-center py-20">Loading...</div>;

  return (
    <div className="text-white ">
      <h1 className="text-3xl font-bold text-orange-500 mb-4">{strategy.title}</h1>

      {!showContent && strategy.isPremium && (
        <div className="text-center mb-4">
          <p className="text-gray-300 mb-2">This is a premium strategy. Payment required to unlock.</p>
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded"
            onClick={handlePayment}
          >
            Pay ₹{strategy.price} to Unlock
          </button>
        </div>
      )}

      {!showContent && !strategy.isPremium && (
        <div className="text-center mb-4">
          <p className="text-gray-300 mb-2">This is a free strategy. Please fill the form to access.</p>
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded"
            onClick={() => setShowFormModal(true)}
          >
            Fill Access Form
          </button>
        </div>
      )}

      {showContent && (
        <div className="space-y-4 ">
          <img
            src={`http://localhost:5000/uploads/${strategy.image}`}
            alt={strategy.title}
            className="w-full h-48 object-cover rounded"
          />
          <p className="text-gray-300 whitespace-pre-line">{strategy.description}</p>
          {strategy.shareLink && (
            <a
              href={strategy.shareLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 underline"
            >
              View Related Resource
            </a>
          )}
        </div>
      )}

      {/* Form Modal */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center px-4">
          <motion.div
            className="bg-white text-black p-6 rounded-lg w-full max-w-md relative shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowFormModal(false)}
              className="absolute top-2 right-3 text-orange-500 font-bold text-xl"
            >
              ×
            </button>

            <h2 className="text-xl font-bold text-orange-500 mb-4">Access the Strategy</h2>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded w-full"
              >
                Submit & Unlock
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ViewStrategy;
