import api from "./api";

export const createOrder = async (items, options = {}) => {
  const payload = {
    items: items.map((i) => ({
      itemId: i._id,
      quantity: i.qty,
      instructions: i.instructions || ""
    })),
    totalAmount: items.reduce((sum, i) => sum + i.price * i.qty, 0),
    pickupTime: options.pickupTime || null,
    orderNotes: options.orderNotes || "",
    paymentMethod: options.paymentMethod || "online"
  };

  const res = await api.post("/orders", payload);
  return res.data;
};

export const fetchMyOrders = async () => {
  const res = await api.get("/orders/my-orders");
  return res.data;
};

export const fetchOrderById = async (id) => {
  const res = await api.get(`/orders/${id}`);
  return res.data;
};

