import { useEffect, useState } from "react";
import { getOwnerDashboard } from "../../api/storeApi.js";
import RatingList from "./RatingsList.jsx";

const OwnerDashboard = () => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRatings = async () => {
    try {
      setLoading(true);
      const res = await getOwnerDashboard();
      setRatings(res.data);
    } catch (err) {
      setError("Failed to load ratings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  const totalRatings = ratings.length;
  const avgRating =
    totalRatings === 0
      ? 0
      : (
          ratings.reduce((sum, r) => sum + Number(r.rating), 0) / totalRatings
        ).toFixed(1);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Owner Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Owner Dashboard</h1>

      {error && (
        <div className="mb-4 bg-red-100 text-red-700 px-4 py-2 rounded">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StatCard title="Total Ratings" value={totalRatings} />
        <StatCard title="Average Rating" value={avgRating} />
      </div>

      {/* Ratings List */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Customer Ratings</h2>
        <RatingList ratings={ratings} />
      </div>
    </div>
  );
};

export default OwnerDashboard;

/* ---------------- Components ---------------- */

const StatCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-xl shadow text-center">
    <p className="text-gray-500 text-sm">{title}</p>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);
