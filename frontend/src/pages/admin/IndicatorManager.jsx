import { useState, useEffect } from "react";
import AdminIndicatorForm from "../../components/AdminIndicatorForm";
import AdminLayout from "./adminLayout";

export default function IndicatorManager() {
  const [indicators, setIndicators] = useState([]);
  const [editingIndicator, setEditingIndicator] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchIndicators();
  }, []);

  const fetchIndicators = async () => {
    const res = await fetch("/api/indicators");
    const data = await res.json();
    setIndicators(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this indicator?")) {
      await fetch(`/api/indicators/${id}`, { method: "DELETE" });
      fetchIndicators();
    }
  };

  const handleFormSubmit = () => {
    setIsFormVisible(false);
    setEditingIndicator(null);
    fetchIndicators();
  };

  return (
    <AdminLayout>
    <div className="bg-black min-h-screen p-10 text-orange-400">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Indicators</h1>
        <button
          onClick={() => {
            setEditingIndicator(null);
            setIsFormVisible(true);
          }}
          className="bg-orange-400 text-black px-4 py-2 rounded font-bold"
        >
          Add New
        </button>
      </div>

      {isFormVisible && (
        <AdminIndicatorForm
          existingData={editingIndicator}
          onSubmit={handleFormSubmit}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {indicators.map(ind => (
          <div key={ind._id} className="bg-gray-800 text-white p-4 rounded shadow">
            <img
              src={`http://localhost:5000/uploads/${ind.image}`}
              alt={ind.title}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h2 className="font-semibold text-lg mb-2">{ind.title}</h2>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => {
                  setEditingIndicator(ind);
                  setIsFormVisible(true);
                }}
                className="bg-yellow-500 text-black px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(ind._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </AdminLayout>
  );
}