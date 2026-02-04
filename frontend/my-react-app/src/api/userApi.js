import api from "./axios";

// ADMIN: Create user (ADMIN / USER / OWNER)
export const createUser = (data) => {
  return api.post("/users", data);
};

// ADMIN: Get all users with filters
export const getAllUsers = (params = {}) => {
  return api.get("/users", { params });
};

// USER / OWNER: Update password
export const updatePassword = (data) => {
  return api.put("/users/update-password", data);
};
