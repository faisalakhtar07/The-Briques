import api from "./axios.js";

export const requestBooking = (propertyId) => api.post("/bookings", { propertyId });
export const getMyBookings = () => api.get("/bookings/mine");
export const getOwnerBookings = () => api.get("/bookings/owner");
export const approveBooking = (id) => api.patch(`/bookings/${id}/approve`);
export const rejectBooking = (id, reason) => api.patch(`/bookings/${id}/reject`, { reason });
