import { useEffect, useState } from "react";
import { getAllStores } from "../../api/storeApi.js";
import RateStore from "./RateStore.jsx";

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({ name: "", address: "" });
  const [selectedStore, setSelectedStore] = useState(null);
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
    <div>
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          name="name"
          placeholder="Store name"
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
          Search
        </button>
      </div>

      {/* Stores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          <p>Loading stores...</p>
        ) : (
          stores.map((store) => (
            <div
              key={store.id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold">{store.name}</h2>
              <p className="text-gray-600">{store.address}</p>

              <p className="mt-2 text-yellow-600 font-medium">
                ⭐ {Number(store.rating).toFixed(1)}
              </p>

              <button
                onClick={() => setSelectedStore(store)}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Rate Store
              </button>
            </div>
          ))
        )}
      </div>

      {/* Rating Modal */}
      {selectedStore && (
        <RateStore
          store={selectedStore}
          onClose={() => setSelectedStore(null)}
        />
      )}
    </div>
  );
};

export default StoreList;
