import api from "./api";

export const fetchDashboard = async () => {
  const res = await api.get("/admin/dashboard");
  return res.data;
};

export const fetchAnalytics = async (days = 7) => {
  const res = await api.get(`/admin/analytics?days=${days}`);
  return res.data;
};

export const fetchAdminOrders = async () => {
  const res = await api.get("/admin/orders");
  return res.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const res = await api.patch(`/admin/orders/${orderId}/status`, { status });
  return res.data;
};

export const fetchAdminUsers = async () => {
  const res = await api.get("/admin/users");
  return res.data;
};

export const blockUser = async (userId) => {
  const res = await api.patch(`/admin/users/${userId}/block`);
  return res.data;
};

export const fetchAdminMenu = async () => {
  const res = await api.get("/admin/menu");
  return res.data;
};

export const createMenuItem = async (data) => {
  const res = await api.post("/admin/menu", data);
  return res.data;
};

export const updateMenuItem = async (id, data) => {
  const res = await api.put(`/admin/menu/${id}`, data);
  return res.data;
};

export const toggleMenuItem = async (id) => {
  const res = await api.patch(`/admin/menu/${id}/toggle`);
  return res.data;
};
