import api from "./axios.js";

export const getPublicProperties = (params) => api.get("/properties", { params });
export const getFeaturedProperties = () => api.get("/properties/featured");
export const getBrowseChips = () => api.get("/properties/browse-chips");
export const getPropertyById = (id) => api.get(`/properties/${id}`);
export const getPropertiesByIds = (ids) => api.get("/properties/by-ids", { params: { ids: ids.join(",") } });

export const getMyProperties = () => api.get("/properties/seller/mine");
export const createProperty = (formData) =>
  api.post("/properties", formData, { headers: { "Content-Type": "multipart/form-data" } });
export const updateMyProperty = (id, data) => api.patch(`/properties/seller/${id}`, data);
export const updateMyPropertyPrice = (id, data) => api.patch(`/properties/seller/${id}/price`, data);

// formData: append "removeIds" (one or more existing image publicIds to
// delete) and/or "images" files (new photos) — either or both, at least
// one photo must remain after the change.
export const updateMyPropertyImages = (id, formData) =>
  api.patch(`/properties/seller/${id}/images`, formData, { headers: { "Content-Type": "multipart/form-data" } });
