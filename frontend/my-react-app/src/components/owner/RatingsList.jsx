const RatingList = ({ ratings }) => {
  if (!ratings || ratings.length === 0) {
    return (
      <p className="text-gray-500 text-center">
        No ratings available yet
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Customer Name</th>
            <th className="p-3">Rating</th>
          </tr>
        </thead>
        <tbody>
          {ratings.map((r, index) => (
            <tr
              key={index}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="p-3">{r.name}</td>
              <td className="p-3 font-semibold text-yellow-600">
                ⭐ {r.rating}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RatingList;
