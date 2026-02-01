import api from "./api";

export const createPaymentOrder = async (orderId) => {
  const res = await api.post("/payments/create", { orderId });
  return res.data;
};

export const verifyPayment = async (data) => {
  const res = await api.post("/payments/verify", data);
  return res.data;
};
