import { useEffect, useState } from "react";
import { getAllStores } from "../../api/storeApi.js";

const StoresList = () => {
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchStores = async () => {
    try {
      setLoading(true);
      const res = await getAllStores(filters);
      setStores(res.data);
    } catch (err) {
      console.error("Failed to fetch stores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Stores</h1>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          name="name"
          placeholder="Store Name"
          value={filters.name}
          onChange={handleChange}
          className="input"
        />
        <input
          name="address"
          placeholder="Address"
          value={filters.address}
          onChange={handleChange}
          className="input"
        />
        <button
          onClick={fetchStores}
          className="bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Apply Filters
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Address</th>
              <th className="p-3">Avg Rating</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              stores.map((s) => (
                <tr
                  key={s.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">{s.name}</td>
                  <td className="p-3">{s.address}</td>
                  <td className="p-3 font-semibold">
                    {Number(s.rating).toFixed(1)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StoresList;
