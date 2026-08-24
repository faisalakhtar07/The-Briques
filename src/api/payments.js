import api from "./axios.js";
export const createPaymentOrder = (propertyId) => api.post("/payments/create-order", { propertyId });
export const verifyPayment = (data) => api.post("/payments/verify", data);
export const getMyTransactions = () => api.get("/payments/my-transactions");
