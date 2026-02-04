import api from "./axios";

// Register normal user
export const registerUser = (data) => {
  return api.post("/auth/register", data);
};

// Login (all roles)
export const loginUser = (data) => {
  return api.post("/auth/login", data);
};

// Logout helper
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};
