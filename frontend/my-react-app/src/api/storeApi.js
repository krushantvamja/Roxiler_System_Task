import api from "./axios";

// ADMIN: Add store
export const addStore = (data) => {
  return api.post("/stores", data);
};

// USER: Get all stores (with filters)
export const getAllStores = (params = {}) => {
  return api.get("/stores", { params });
};

// OWNER: Owner dashboard (ratings)
export const getOwnerDashboard = () => {
  return api.get("/stores/owner/dashboard");
};

// ADMIN: Assign store owner
export const assignStoreOwner = (storeId, userId) => {
  return api.patch(`/stores/${storeId}/owner`, { userId });
};
