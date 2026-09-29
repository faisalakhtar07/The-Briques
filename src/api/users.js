import api from "./axios.js";

export const getSavedProperties = () => api.get("/users/me/saved");
export const toggleSavedProperty = (propertyId) => api.patch(`/users/me/saved/${propertyId}`);
