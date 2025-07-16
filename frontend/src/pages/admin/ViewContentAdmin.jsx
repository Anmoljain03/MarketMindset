import { useEffect, useState } from "react";
import AdminLayout from "./adminLayout";

// ShareButton component
const ShareButton = ({ url }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      type="button"
    >
      {copied ? "Copied!" : "Share"}
    </button>
  );
};

const ViewContentAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");

  // Global view content states
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");

  // Message for feedback
  const [message, setMessage] = useState("");

  // Individual strategies
  const [strategies, setStrategies] = useState([]);
  const [selectedStrategy, setSelectedStrategy] = useState("");

  // Individual strategy states
  const [strategyTitle, setStrategyTitle] = useState("");
  const [strategyDescription, setStrategyDescription] = useState("");
  const [strategyImg, setStrategyImg] = useState("");

  // Fetch all categories once
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/strategies");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch strategies when category and subcategory selected
  useEffect(() => {
    if (category && subcategory) {
      const fetchStrategies = async () => {
        try {
          const res = await fetch(
            `http://localhost:5000/api/strategies/${category}/${subcategory}`
          );
          const data = await res.json();
          setStrategies(data);

          // Optionally, fetch global view content for this category & subcategory
          // If your backend supports, fetch that data to populate description/img for global view content
          // Example:
          /*
          const viewContentRes = await fetch(`http://localhost:5000/api/strategies/view-content/${category}/${subcategory}`);
          if(viewContentRes.ok) {
            const viewData = await viewContentRes.json();
            setDescription(viewData.description || "");
            setImg(viewData.img || "");
          }
          */
        } catch (err) {
          console.error(err);
        }
      };
      fetchStrategies();
    }
  }, [category, subcategory]);

  // Handle submit for global view content (subcategory description, img)
 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!category || !subcategory) {
    setMessage("Select both category and subcategory.");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/strategies/view-content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category, subcategory, description, img }),
    });

    if (res.ok) {
      setMessage("View content updated successfully.");
      
      // Refetch the saved content to update local state (optional, but recommended)
      const updatedContentRes = await fetch(`http://localhost:5000/api/strategies/view-content/${category}/${subcategory}`);
      if (updatedContentRes.ok) {
        const updatedContent = await updatedContentRes.json();
        setDescription(updatedContent.description || "");
        setImg(updatedContent.img || "");
      }
    } else {
      setMessage("Failed to update view content.");
    }
  } catch (error) {
    console.error(error);
    setMessage("Error occurred while updating view content.");
  }
};

  // Handle update for individual strategy
 const handleStrategyUpdate = async () => {
  if (!selectedStrategy || !category || !subcategory) {
    setMessage("Select category, subcategory and strategy.");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/strategies/update-strategy", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category,
        subcategory,
        title: selectedStrategy,
        newTitle: strategyTitle,
        description: strategyDescription,
        img: strategyImg,
      }),
    });

    const handleUpdate = async () => {
  const res = await fetch("http://localhost:5000/api/strategies/view-content", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ category, subcategory, description, img, shareLink }),
  });

  if (res.ok) {
    setMessage("View content updated successfully.");
    // Optionally, refetch or update parent state with new content here
  }
};


    const result = await res.json();
    setMessage(result.message || "Strategy update failed.");

    if (res.ok) {
      // Refetch strategies for updated list
      const refreshed = await fetch(`http://localhost:5000/api/strategies/${category}/${subcategory}`);
      if (refreshed.ok) {
        const refreshedData = await refreshed.json();
        setStrategies(refreshedData);
        setSelectedStrategy(strategyTitle);  // Update selection to new title if changed
      }
    }
  } catch (err) {
    console.error(err);
    setMessage("Error while updating strategy.");
  }
};


  return (
    <AdminLayout>
    <div className="bg-black py-36 min-h-screen">
      <div className="max-w-xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-orange-400">Admin: View Content Editor</h2>

        {message && (
          <p className={`mb-4 ${message.includes("success") ? "text-green-400" : "text-red-400"}`}>
            {message}
          </p>
        )}

        {/* Global view content form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 rounded bg-gray-800 text-white"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="p-2 rounded bg-gray-800 text-white"
            disabled={!category}
          >
            <option value="">Select Subcategory</option>
            {category &&
              categories
                .find((cat) => cat.name === category)
                ?.subcategories.map((sub) => (
                  <option key={sub.name} value={sub.name}>
                    {sub.name}
                  </option>
                ))}
          </select>

          <input
            type="text"
            placeholder="Image URL"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            className="p-2 rounded bg-gray-800 text-white"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="p-2 rounded bg-gray-800 text-white"
          />

          {/* Replace Share Link input with ShareButton */}
          {category && subcategory && (
            <div>
              <ShareButton url={`http://localhost:3000/strategies/${category}/${subcategory}`} />
              <p className="text-gray-400 text-sm mt-1">Click to copy share URL</p>
            </div>
          )}

          <button
            type="submit"
            className="bg-orange-400 hover:bg-orange-500 transition-colors text-black py-2 rounded font-semibold"
          >
            Save View Content
          </button>
        </form>

        {/* Individual strategy edit */}
        {subcategory && (
          <>
            <hr className="my-6 border-gray-700" />

            <h3 className="text-xl font-semibold mb-2 text-orange-300">Edit Individual Strategy</h3>

            <select
              value={selectedStrategy}
              onChange={(e) => {
                const selected = strategies.find((s) => s.title === e.target.value);
                setSelectedStrategy(e.target.value);
                if (selected) {
                  setStrategyTitle(selected.title);
                  setStrategyDescription(selected.description);
                  setStrategyImg(selected.img);
                } else {
                  // Clear if none selected
                  setStrategyTitle("");
                  setStrategyDescription("");
                  setStrategyImg("");
                }
              }}
              className="p-2 rounded bg-gray-800 text-white mb-2"
            >
              <option value="">Select Strategy</option>
              {strategies.map((s) => (
                <option key={s.title} value={s.title}>
                  {s.title}
                </option>
              ))}
            </select>

            {selectedStrategy && (
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Strategy Title"
                  value={strategyTitle}
                  onChange={(e) => setStrategyTitle(e.target.value)}
                  className="p-2 rounded bg-gray-800 text-white"
                />

                <input
                  type="text"
                  placeholder="Strategy Image URL"
                  value={strategyImg}
                  onChange={(e) => setStrategyImg(e.target.value)}
                  className="p-2 rounded bg-gray-800 text-white"
                />

                <textarea
                  rows={3}
                  placeholder="Strategy Description"
                  value={strategyDescription}
                  onChange={(e) => setStrategyDescription(e.target.value)}
                  className="p-2 rounded bg-gray-800 text-white"
                />

                <button
                  type="button"
                  onClick={handleStrategyUpdate}
                  className="bg-green-500 hover:bg-green-600 transition-colors text-black py-2 rounded font-semibold"
                >
                  Update Strategy
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
    </AdminLayout>
  );
};

export default ViewContentAdmin;
