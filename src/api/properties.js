import api from "./axios.js";

export const getPublicProperties = (params) => api.get("/properties", { params });
export const getFeaturedProperties = () => api.get("/properties/featured");
export const getPropertyById = (id) => api.get(`/properties/${id}`);

export const getMyProperties = () => api.get("/properties/seller/mine");
export const createProperty = (formData) =>
  api.post("/properties", formData, { headers: { "Content-Type": "multipart/form-data" } });
export const updateMyProperty = (id, data) => api.patch(`/properties/seller/${id}`, data);
