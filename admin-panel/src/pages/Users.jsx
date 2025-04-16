import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5003/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err.response?.data || err.message);
    }
  };

  const filteredUsers = users.filter((u) =>
    (u.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (u.email || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setFormData({ name: user.name || "", email: user.email });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5003/api/users/${editingUser}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5003/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(users.filter((u) => u._id !== id));
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  const exportToCSV = () => {
    const csvRows = [
      ["Name", "Email"],
      ...filteredUsers.map((u) => [u.name, u.email]),
    ];
    const csvContent = csvRows.map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "users.csv";
    link.click();
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Name", "Email"]],
      body: filteredUsers.map((u) => [u.name, u.email]),
    });
    doc.save("users.pdf");
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-semibold text-slate-800 mb-6">User Management</h2>

      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 p-3 border border-gray-300 rounded-md shadow-sm w-full max-w-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      {/* ✅ Export Buttons */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={exportToCSV}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Export CSV
        </button>
        <button
          onClick={exportToPDF}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Export PDF
        </button>
      </div>

      {editingUser && (
        <div className="bg-green-50 border border-green-300 rounded-lg p-6 mb-8 shadow">
          <h3 className="text-lg font-medium text-green-800 mb-4">Edit User</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <div className="flex items-center gap-2">
              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
              >
                Save
              </button>
              <button
                onClick={() => setEditingUser(null)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-green-700 text-white uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-slate-800">
            {filteredUsers.map((user) => (
              <tr key={user._id} className="border-t hover:bg-green-50">
                <td className="px-6 py-3">{user.name}</td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3 text-right space-x-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="px-4 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded-md transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;