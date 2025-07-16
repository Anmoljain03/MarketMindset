import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ViewStrategy from './ViewStrategy';

const Strategies = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [strategies, setStrategies] = useState([]);

  // Modal state
  const [selectedStrategyId, setSelectedStrategyId] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get('/api/admin/category');
      setCategories(res.data);
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = async (categoryId) => {
    setActiveCategory(categoryId);
    setActiveSubcategory(null);
    const res = await axios.get(`/api/admin/subcategory/${categoryId}`);
    setSubcategories(res.data);
    setStrategies([]);
  };

  const handleSubcategoryClick = async (subcategoryId) => {
    setActiveSubcategory(subcategoryId);
    const res = await axios.get(`/api/admin/by-subcategory/${subcategoryId}`);
    setStrategies(res.data);
  };

  return (
    <div className="text-white bg-black px-6 py-28">
      <h2 className="text-3xl font-bold text-center mb-6 text-orange-500">Strategy Timeline</h2>
      <p className="text-center mb-8 text-gray-300">Choose your category and explore strategies</p>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => handleCategoryClick(cat._id)}
            className={`px-4 py-2 rounded ${cat._id === activeCategory ? 'bg-orange-500' : 'bg-gray-700'}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Subcategory Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {subcategories.map((sub) => (
          <button
            key={sub._id}
            onClick={() => handleSubcategoryClick(sub._id)}
            className={`px-4 py-2 rounded ${sub._id === activeSubcategory ? 'bg-orange-400' : 'bg-gray-800'}`}
          >
            {sub.name}
          </button>
        ))}
      </div>

      {/* Strategy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {strategies.map((strategy, idx) => (
          <div key={strategy._id} className="bg-[#0c1427] p-4 rounded-xl shadow-xl">
            <div className="relative mb-4">
              <img
                src={`http://localhost:5000/uploads/${strategy.image}`}
                alt={strategy.title}
                className="w-full h-48 object-cover rounded"
              />
              <span className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full">{idx + 1}</span>
            </div>
            <h3 className="text-orange-400 font-semibold text-lg">{strategy.title}</h3>
            <p className="text-sm text-gray-300">{strategy.shortDescription}</p>
            <button
              className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded"
              onClick={() => setSelectedStrategyId(strategy._id)}
            >
              View Strategy
            </button>
          </div>
        ))}
      </div>

      {/* Strategy Modal */}
      {selectedStrategyId && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center px-4">
          <div className="relative bg-[#0c1427] rounded-xl max-w-4xl w-full overflow-y-auto max-h-[90vh] p-4">
            <button
              onClick={() => setSelectedStrategyId(null)}
              className="absolute top-3 right-4 text-white text-2xl font-bold"
            >
              ×
            </button>
            <ViewStrategy id={selectedStrategyId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Strategies;
