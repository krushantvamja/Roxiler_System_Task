// User roles (must match backend exactly)
export const ROLES = {
  ADMIN: "ADMIN",
  OWNER: "OWNER",
  USER: "USER",
};

// LocalStorage keys
export const STORAGE_KEYS = {
  TOKEN: "token",
  ROLE: "role",
};

// API-related
export const API_STATUS = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

// Ratings
export const RATINGS = [1, 2, 3, 4, 5];

// Route paths (optional but recommended)
export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  ADMIN: "/admin",
  OWNER: "/owner",
  USER: "/user",
  UNAUTHORIZED: "/unauthorized",
};
