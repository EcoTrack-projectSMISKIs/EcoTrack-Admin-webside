import { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5003/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const filteredUsers = users.filter((u) =>
    (u.name || "").toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setFormData({ name: user.name || "", email: user.email });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5003/api/users/${editingUser}`, formData);
      alert("User updated!");
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      alert("Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5003/api/users/${id}`);
        setUsers(users.filter((u) => u._id !== id));
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  return (
    <section className="content-section">
      <div className="header-container">
        <h2>User Management</h2>
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "8px", width: "200px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.name || "—"}</td>
              <td>{user.email}</td>
              <td>{user.username ? "Active" : "Pending"}</td>
              <td className="user-actions">
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editingUser && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <h3>Edit User</h3>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={modalStyles.input}
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={modalStyles.input}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={handleUpdate}>Update</button>
              <button onClick={() => setEditingUser(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const modalStyles = {
  overlay: {
    position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center"
  },
  modal: {
    background: "white", padding: "20px", borderRadius: "10px", minWidth: "300px"
  },
  input: {
    width: "100%", padding: "10px", margin: "10px 0", border: "1px solid #ccc", borderRadius: "5px"
  }
};

export default Users;