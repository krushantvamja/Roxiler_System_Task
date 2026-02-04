import api from "./axios";

// USER: Submit or update rating
export const submitRating = (data) => {
  return api.post("/ratings", data);
};

// ADMIN: Total ratings count
export const getTotalRatings = () => {
  return api.get("/ratings/count");
};
