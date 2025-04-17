import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminManagement() {
  const [admins, setAdmins] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ name: "", email: "" });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await axios.get("http://localhost:5003/api/admin/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setMessage("Failed to fetch admins.");
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const results = admins.filter((a) =>
      a.name.toLowerCase().includes(value) || a.email.toLowerCase().includes(value)
    );
    setFiltered(results);
  };

  const deleteAdmin = async (id) => {
    if (!window.confirm("Delete this admin?")) return;
    try {
      await axios.delete(`http://localhost:5003/api/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Admin deleted.");
      fetchAdmins();
    } catch (err) {
      console.error("Delete error:", err);
      setMessage("Delete failed.");
    }
  };

  const startEdit = (admin) => {
    setEditingId(admin._id);
    setEditValues({ name: admin.name, email: admin.email });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({ name: "", email: "" });
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(
        `http://localhost:5003/api/admin/${id}`,
        editValues,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Updated successfully.");
      cancelEdit();
      fetchAdmins();
    } catch (err) {
      console.error("Edit error:", err);
      setMessage("Failed to update.");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Admins</h1>
      {message && <p className="text-green-600 mb-4">{message}</p>}

      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search by name or email..."
        className="px-4 py-2 border rounded-md w-full mb-4"
      />

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm text-left border">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((admin) => (
              <tr key={admin._id} className="border-t">
                <td className="px-4 py-2">
                  {editingId === admin._id ? (
                    <input
                      value={editValues.name}
                      onChange={(e) =>
                        setEditValues({ ...editValues, name: e.target.value })
                      }
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    admin.name
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingId === admin._id ? (
                    <input
                      value={editValues.email}
                      onChange={(e) =>
                        setEditValues({ ...editValues, email: e.target.value })
                      }
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    admin.email
                  )}
                </td>
                <td className="px-4 py-2 capitalize">{admin.role}</td>
                <td className="px-4 py-2 text-right space-x-2">
                  {admin.role === "superadmin" ? (
                    <span className="italic text-gray-500">Protected</span>
                  ) : editingId === admin._id ? (
                    <>
                      <button
                        onClick={() => saveEdit(admin._id)}
                        className="bg-green-600 text-white px-2 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-400 text-white px-2 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(admin)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteAdmin(admin._id)}
                        className="bg-red-600 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}