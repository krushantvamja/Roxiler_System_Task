import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import Login from "./components/auth/Login.jsx";
import Register from "./components/auth/Register.jsx";
import AdminDashboard from "./components/admin/AdminDashboard.jsx";
import OwnerDashboard from "./components/owner/OwnerDashboard.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["OWNER"]} />}>
        <Route path="/owner" element={<OwnerDashboard />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
        <Route path="/user" element={<UserDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
