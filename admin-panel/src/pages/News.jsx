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
    <div style={{ padding: 32 }}>
      <h2 style={{ fontSize: 26, fontWeight: "bold", marginBottom: 16, color: "#0f172a" }}>
        News & Updates
      </h2>

      <div style={{ textAlign: "right", marginBottom: 20 }}>
        <button
          onClick={() => {
            setShowModal(true);
            setFormData({ title: "", content: "", image: "" });
            setEditingNewsId(null);
          }}
          style={{
            backgroundColor: "#0ea5e9",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          + Add News
        </button>
      </div>

      {newsList.map((news) => (
        <div key={news._id} style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "24px"
        }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: 0 }}>{news.title}</h3>
            <p style={{ color: "#475569" }}>{news.content}</p>
            {news.image && (
              <img src={news.image} alt="News" style={{ maxWidth: "200px", borderRadius: "8px", marginTop: "10px" }} />
            )}
            <p style={{ fontSize: "12px", color: "#64748b", marginTop: "10px" }}>
              Posted: {formatDate(news.createdAt)}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <button onClick={() => openEdit(news)} style={styles.editBtn}>Edit</button>
            <button onClick={() => handleDelete(news._id)} style={styles.deleteBtn}>Delete</button>
          </div>
        </div>
      ))}

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>{editingNewsId ? "Edit News" : "Add News"}</h3>
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={styles.input}
            />
            <textarea
              placeholder="Content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              style={styles.textarea}
            />
            <input
              type="text"
              placeholder="Image URL (optional)"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              style={styles.input}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button onClick={() => setShowModal(false)} style={styles.cancelBtn}>Cancel</button>
              <button onClick={handleSubmit} style={styles.confirmBtn}>
                {editingNewsId ? "Update" : "Post"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    resize: "vertical",
    minHeight: "100px",
  },
  editBtn: {
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "6px 12px",
    cursor: "pointer",
  },
  deleteBtn: {
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "6px 12px",
    cursor: "pointer",
  },
  cancelBtn: {
    backgroundColor: "#94a3b8",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "8px 14px",
    cursor: "pointer",
  },
  confirmBtn: {
    backgroundColor: "#0ea5e9",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "8px 14px",
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    top: 0, left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "500px",
    maxWidth: "90%",
    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
  },
};

export default News;