import api from "./axios.js";

export const getVapidPublicKey = () => api.get("/push/vapid-public-key");
export const subscribeToPush = (subscription) => api.post("/push/subscribe", { subscription });
export const unsubscribeFromPush = (endpoint) => api.post("/push/unsubscribe", { endpoint });
