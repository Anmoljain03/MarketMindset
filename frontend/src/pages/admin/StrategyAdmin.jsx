import { useState } from "react";
import AdminLayout from './adminLayout';

const StrategyAdmin = () => {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category || !subcategory || !title) {
      setMessage("Please fill in all required fields.");
      return;
    }

    const payload = {
      category,
      subcategory,
      title,
      description,
      img,
    };

    try {
      const res = await fetch("http://localhost:5000/api/strategies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage("Strategy added successfully!");
        setCategory("");
        setSubcategory("");
        setTitle("");
        setDescription("");
        setImg("");
      } else {
        setMessage("Failed to add strategy.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error adding strategy.");
    }
  };

  return (
    <AdminLayout>
    <div className="bg-black">    
    <div className="max-w-xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg py-52">
      <h2 className="text-2xl font-bold mb-4 text-orange-400">Admin Panel: Add Strategy</h2>

      {message && (
        <p
          className={`mb-4 ${
            message.includes("success") ? "text-green-400" : "text-red-400"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Category Name *"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white"
          required
        />

        <input
          type="text"
          placeholder="Subcategory Name *"
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white"
          required
        />

        <input
          type="text"
          placeholder="Strategy Title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white"
          rows={4}
        />

        <input
          type="text"
          placeholder="Image URL"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white"
        />

        <button
          type="submit"
          className="bg-orange-400 hover:bg-orange-500 transition-colors text-black py-2 rounded font-semibold"
        >
          Add Strategy
        </button>
      </form>
    </div>
    </div>
</AdminLayout>
  );
};

export default StrategyAdmin;
