import { useState, useEffect } from "react";

export default function AdminIndicatorForm({ existingData = null, onSubmit }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (existingData) {
      setTitle(existingData.title);
      setDescription(existingData.description);
    }
  }, [existingData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    if (image) formData.append("image", image);
    formData.append("description", description);
    if (file) formData.append("file", file);

    const method = existingData ? "PUT" : "POST";
    const endpoint = existingData ? `/api/indicators/${existingData._id}` : "/api/indicators";

    const res = await fetch(endpoint, {
      method,
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      onSubmit(data);
      setTitle("");
      setImage(null);
      setDescription("");
      setFile(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded text-white">
      <h2 className="text-xl mb-4 font-semibold">{existingData ? "Edit" : "Add"} Indicator</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-4 bg-gray-700 rounded"
        required
      />

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="w-full p-2 mb-4 bg-gray-700 rounded"
        accept="image/*"
      />

      <textarea
        placeholder="Description (HTML allowed)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-4 bg-gray-700 rounded h-32"
        required
      ></textarea>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full p-2 mb-4 bg-gray-700 rounded"
        accept="application/pdf"
      />

      <button type="submit" className="bg-orange-400 text-black px-4 py-2 rounded font-bold">
        {existingData ? "Update" : "Add"} Indicator
      </button>
    </form>
  );
}
