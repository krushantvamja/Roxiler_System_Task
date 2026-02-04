import StoreList from "../components/user/StoreList.jsx"

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
      <StoreList />
    </div>
  );
};

export default UserDashboard;
