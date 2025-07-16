import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const StrategyDetail = () => {
  const { category, subcategory, title } = useParams();
  const [strategy, setStrategy] = useState(null);
  const [viewContent, setViewContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/strategies/${category}/${subcategory}/${title}/view`)
      .then((res) => res.json())
      .then((data) => {
        setStrategy(data.strategy);
        setViewContent(data.viewContent);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [category, subcategory, title]);

  if (loading) return <div>Loading...</div>;
  if (!strategy) return <div>Strategy not found.</div>;

  return (
    <div className="bg-black py-18 ">
  <div className="max-w-4xl mx-auto px-6 py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-orange-400 rounded-2xl shadow-2xl mt-10 border border-orange-500">
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-center mb-10"
  >
    <h1 className="text-4xl font-bold mb-2">Strategy Details</h1>
    <p className="text-gray-400">Explore the specifics of this strategy and its broader context.</p>
  </motion.div>

  {/* Subcategory Content */}
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.7 }}
    className="mt-12 pt-6 border-t border-gray-700"
  >
    <h2 className="text-2xl text-white font-semibold mb-6 border-l-4 border-orange-400 pl-3">About This Category</h2>
    {viewContent.img && (
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center mb-6"
      >
        <img src={viewContent.img} alt="Extra Info" className="w-full max-w-2xl h-80 rounded-xl shadow-md" />
      </motion.div>
    )}
    {viewContent.description && (
      <p className="text-gray-300 mb-6 text-lg leading-relaxed">
        {viewContent.description}
      </p>
    )}
    {viewContent.shareLink && (
      <div className="mt-4">
        <a
          href={viewContent.shareLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-400 underline hover:text-orange-300 transition"
        >
          🔗 Share this strategy
        </a>
      </div>
    )}
  </motion.div>
</div>
</div>
  );
};

export default StrategyDetail;
