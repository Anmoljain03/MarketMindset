import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FreeIndicators() {
  const [indicators, setIndicators] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/indicators")
      .then(res => res.json())
      .then(data => setIndicators(data));
  }, []);

  const handleCardClick = (id) => {
    navigate(`/indicator/${id}`);
  };

  return (
    <div className="bg-black text-orange-400 py-28">
      <h2 className="text-3xl font-bold text-center mb-10">Free Indicators</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10">
  {indicators.map(ind => (
    <div
      key={ind._id}
      onClick={() => handleCardClick(ind._id)}
      className="cursor-pointer bg-white rounded shadow-lg overflow-hidden hover:scale-105 transition duration-300 relative group"
    >
      <img
        src={`http://localhost:5000/uploads/${ind.image}`}
        alt={ind.title}
        className="w-full h-48 object-cover"
      />
      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-90 transition duration-300 flex items-center justify-center text-white font-bold text-lg pointer-events-none">
        Click to view content
      </div>

      <div className="p-4 text-black font-semibold text-center">
        {ind.title}
      </div>
    </div>
  ))}
</div>

    </div>
  );
}
