import { useEffect, useState } from "react";
import axios from "axios";

const News = () => {
  const [newsList, setNewsList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingNewsId, setEditingNewsId] = useState(null);
  const [formData, setFormData] = useState({ title: "", content: "", image: "" });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await axios.get("http://localhost:5003/api/news");
      setNewsList(res.data);
    } catch (err) {
      console.error("Failed to fetch news:", err);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingNewsId) {
        await axios.put(`http://localhost:5003/api/news/${editingNewsId}`, formData);
      } else {
        await axios.post("http://localhost:5003/api/news", formData);
      }
      fetchNews();
      setFormData({ title: "", content: "", image: "" });
      setEditingNewsId(null);
      setShowModal(false);
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this news?")) {
      try {
        await axios.delete(`http://localhost:5003/api/news/${id}`);
        setNewsList(newsList.filter((n) => n._id !== id));
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  const openEdit = (news) => {
    setFormData(news);
    setEditingNewsId(news._id);
    setShowModal(true);
  };

  const formatDate = (dateStr) => new Date(dateStr).toLocaleString();

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">News & Updates</h2>

      <div className="text-right mb-6">
        <button
          onClick={() => {
            setShowModal(true);
            setFormData({ title: "", content: "", image: "" });
            setEditingNewsId(null);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add News
        </button>
      </div>

      <div className="space-y-6">
        {newsList.map((news) => (
          <div key={news._id} className="p-4 bg-white rounded shadow">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800">{news.title}</h3>
              <span className="text-sm text-gray-500">{formatDate(news.createdAt)}</span>
            </div>
            <p className="text-gray-700 mb-2">{news.content}</p>
            {news.image && (
              <img src={news.image} alt={news.title} className="w-full max-w-md rounded mb-2" />
            )}
            <div className="flex gap-3">
              <button
                onClick={() => openEdit(news)}
                className="px-4 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(news._id)}
                className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {editingNewsId ? "Edit News" : "Add News"}
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border rounded px-3 py-2 outline-none"
              />
              <textarea
                placeholder="Content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full border rounded px-3 py-2 outline-none h-24 resize-none"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full border rounded px-3 py-2 outline-none"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;