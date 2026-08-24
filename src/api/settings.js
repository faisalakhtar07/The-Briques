import api from "./axios.js";
export const getPublicSettings = () => api.get("/settings");
