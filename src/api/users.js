import api from "./axios.js";

export const getMyFullProfile = () => api.get("/users/me");
export const getSavedProperties = () => api.get("/users/me/saved");
export const toggleSavedProperty = (propertyId) => api.patch(`/users/me/saved/${propertyId}`);

// Account Privacy — email OTP password change (for an already-logged-in user)
export const requestPasswordOtp = () => api.post("/users/me/password-otp/request");
export const verifyPasswordOtp = (otp, newPassword) => api.post("/users/me/password-otp/verify", { otp, newPassword });
