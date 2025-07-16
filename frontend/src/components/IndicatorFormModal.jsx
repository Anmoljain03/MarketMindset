// src/components/IndicatorFormModal.jsx
import { useState } from "react";
const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function IndicatorFormModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async e => {
  e.preventDefault();

  try {
   const res = await fetch(`${baseURL}/api/indicator-users`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData)
});

    if (res.ok) {
      onSubmit(formData); // Optional: pass data to parent
      onClose(); // Close modal
    } else {
      console.error("Failed to submit form");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md">
        <h2 className="text-lg font-bold mb-4 text-black">Enter Your Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" placeholder="Name" onChange={handleChange} required className="w-full p-2 border rounded" />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 border rounded" />
          <input name="phone" placeholder="Phone" onChange={handleChange} required className="w-full p-2 border rounded" />
          <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded w-full">Submit</button>
        </form>
      </div>
    </div>
  );
}
