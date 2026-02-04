import { useEffect, useState } from "react";
import { getAllUsers } from "../../api/userApi.js";
import { addStore, getAllStores, assignStoreOwner } from "../../api/storeApi.js";
import { getTotalRatings } from "../../api/ratingApi.js";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [totalRatings, setTotalRatings] = useState(0);
  const [selectedStoreByUser, setSelectedStoreByUser] = useState({});

  const [storeForm, setStoreForm] = useState({
    name: "",
    email: "",
    address: "",
    ownerId: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [usersRes, storesRes, ratingsRes] = await Promise.all([
        getAllUsers(),
        getAllStores(),
        getTotalRatings(),
      ]);

      setUsers(usersRes.data);
      setStores(storesRes.data);
      setTotalRatings(ratingsRes.data.totalRatings);
    } catch (err) {
      setError("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleChange = (e) => {
    setStoreForm({ ...storeForm, [e.target.name]: e.target.value });
  };

  const handleAddStore = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !storeForm.name ||
      !storeForm.email ||
      !storeForm.address ||
      !storeForm.ownerId
    ) {
      return setError("All store fields are required");
    }

    try {
      setLoading(true);
      await addStore(storeForm);
      setStoreForm({ name: "", email: "", address: "", ownerId: "" });
      fetchDashboardData();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add store");
    } finally {
      setLoading(false);
    }
  };

  const handleStoreSelect = (userId, storeId) => {
    setSelectedStoreByUser((prev) => ({
      ...prev,
      [userId]: storeId,
    }));
  };

  const handleAssignOwner = async (userId) => {
    setError("");
    try {
      const storeId = selectedStoreByUser[userId];
      if (!storeId) {
        return setError("Please select a store to assign");
      }
      setLoading(true);
      await assignStoreOwner(storeId, userId);
      fetchDashboardData();
    } catch (err) {
      const data = err.response?.data;
      setError(
        (typeof data === "string" ? data : data?.message || data?.error) ||
          "Failed to assign store owner"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading Admin Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {error && (
        <div className="mb-4 bg-red-100 text-red-700 px-4 py-2 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Users" value={users.length} />
        <StatCard title="Total Stores" value={stores.length} />
        <StatCard title="Total Ratings" value={totalRatings} />
      </div>

      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Add Store</h2>

        <form
          onSubmit={handleAddStore}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            name="name"
            placeholder="Store Name"
            value={storeForm.name}
            onChange={handleChange}
            className="input"
          />
          <input
            name="email"
            placeholder="Store Email"
            value={storeForm.email}
            onChange={handleChange}
            className="input"
          />
          <input
            name="address"
            placeholder="Store Address"
            value={storeForm.address}
            onChange={handleChange}
            className="input"
          />
          <input
            name="ownerId"
            placeholder="Owner User ID"
            value={storeForm.ownerId}
            onChange={handleChange}
            className="input"
          />

          <button className="col-span-1 md:col-span-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Add Store
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Users</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Address</th>
                <th className="p-3">Role</th>
                <th className="p-3">Assign Store Owner</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr
                  key={u.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.address}</td>
                  <td className="p-3 font-medium">{u.role}</td>
                  <td className="p-3">
                    {u.role === "USER" ? (
                      <div className="flex flex-col sm:flex-row gap-2">
                        <select
                          value={selectedStoreByUser[u.id] || ""}
                          onChange={(e) =>
                            handleStoreSelect(u.id, e.target.value)
                          }
                          className="input"
                        >
                          <option value="">Select store</option>
                          {stores.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => handleAssignOwner(u.id)}
                          className="bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700 transition"
                        >
                          Assign Owner
                        </button>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

const StatCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-xl shadow text-center">
    <h3 className="text-gray-500 text-sm">{title}</h3>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);
