import { useEffect, useState } from "react";
import axios from "axios";

export default function Settings() {
  const [admin, setAdmin] = useState({ name: "", email: "", role: "" });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [newAdmin, setNewAdmin] = useState({ name: "", email: "", password: "" });
  const [createMessage, setCreateMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5003/api/admin/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdmin(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load profile:", err);
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "http://localhost:5003/api/admin/profile",
        { name: admin.name, email: admin.email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Profile updated.");
    } catch (err) {
      setMessage("Error updating profile.");
    }
  };

  const handleNewAdminChange = (e) => {
    setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5003/api/admin/create",
        newAdmin,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCreateMessage("New admin created successfully.");
      setNewAdmin({ name: "", email: "", password: "" });
    } catch (err) {
      setCreateMessage("Failed to create admin.");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Admin Settings</h1>

      {/* Admin Info Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 space-y-4 mb-6">
        <div>
          <label className="block text-gray-700 text-sm mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={admin.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={admin.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
        >
          Save Changes
        </button>

        {message && <p className="text-sm text-green-700">{message}</p>}
      </form>

      {/* Superadmin - Create Admin */}
      {admin.role === "superadmin" && (
        <div className="bg-white rounded shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold mb-2">Add New Admin</h2>

          <form onSubmit={handleCreateAdmin} className="space-y-3">
            <div>
              <label className="block text-gray-700 text-sm mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={newAdmin.name}
                onChange={handleNewAdminChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={newAdmin.email}
                onChange={handleNewAdminChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={newAdmin.password}
                onChange={handleNewAdminChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
            >
              Create Admin
            </button>

            {createMessage && <p className="text-sm text-blue-700">{createMessage}</p>}
          </form>
        </div>
      )}
    </div>
  );
}