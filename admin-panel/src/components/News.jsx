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
    <div style={{ padding: 24 }}>
      <h2 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 16 }}>News and Updates</h2>

      <div style={{ textAlign: "right", marginBottom: 16 }}>
        <button style={styles.addBtn} onClick={() => { setShowModal(true); setFormData({ title: "", content: "", image: "" }); setEditingNewsId(null); }}>Add News</button>
      </div>

      {newsList.map((news) => (
        <div key={news._id} style={styles.card}>
          <div style={{ flex: 1 }}>
            <h3>{news.title}</h3>
            <p>{news.content}</p>
            {news.image && <img src={news.image} alt="News" style={{ maxWidth: 200, marginTop: 10 }} />}
            <p style={{ fontSize: 12, color: "#555" }}>Posted: {formatDate(news.createdAt)}</p>
          </div>
          <div style={styles.actions}>
            <button onClick={() => openEdit(news)} style={styles.editBtn}>Edit</button>
            <button onClick={() => handleDelete(news._id)} style={styles.deleteBtn}>Delete</button>
          </div>
        </div>
      ))}

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>{editingNewsId ? "Edit News" : "Add News or Updates"}</h3>
            <input
              type="text"
              placeholder="TITLE"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={styles.input}
            />
            <textarea
              placeholder="Insert content...."
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
            <div style={styles.modalActions}>
              <button onClick={() => setShowModal(false)} style={styles.cancelBtn}>Cancel</button>
              <button onClick={handleSubmit} style={styles.confirmBtn}>{editingNewsId ? "Update" : "Confirm"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  card: {
    background: "#eef6ee",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginLeft: "20px",
  },
  addBtn: {
    backgroundColor: "#275c6c",
    color: "white",
    padding: "10px 16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
  editBtn: {
    backgroundColor: "#275c6c",
    color: "white",
    padding: "6px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  deleteBtn: {
    backgroundColor: "#f28c8c",
    color: "white",
    padding: "6px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    top: 0, left: 0, width: "100%", height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex", justifyContent: "center", alignItems: "center",
  },
  modal: {
    backgroundColor: "#f3f3f3",
    padding: "30px",
    borderRadius: "10px",
    width: "500px",
    maxWidth: "90%",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
    resize: "vertical",
    height: 100
  },
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  cancelBtn: {
    backgroundColor: "#f28c8c",
    color: "white",
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
  confirmBtn: {
    backgroundColor: "#275c6c",
    color: "white",
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
};

export default News;
