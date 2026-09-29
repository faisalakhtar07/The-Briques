import api from "./axios.js";

// Step 1: creates the Razorpay order for the connect fee (or, if the fee is
// disabled in Site Settings, sends the request straight through — check
// paymentRequired in the response).
export const initiateBooking = (propertyId, eventDate) =>
  api.post("/bookings/initiate", { propertyId, eventDate: eventDate || undefined });

// Step 2: called after Razorpay checkout succeeds, with its response object.
export const verifyBookingPayment = (bookingId, razorpayResponse) =>
  api.post("/bookings/verify", { bookingId, ...razorpayResponse });
export const getMyBookings = () => api.get("/bookings/mine");
export const getSellerBookings = () => api.get("/bookings/seller");
export const getOwnerBookings = () => api.get("/bookings/owner");
export const approveBooking = (id) => api.patch(`/bookings/${id}/approve`);
export const rejectBooking = (id, reason) => api.patch(`/bookings/${id}/reject`, { reason });
