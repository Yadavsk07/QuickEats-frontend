import api from "./api";

export const fetchMenu = async () => {
  const res = await api.get("/menu");
  return res.data;
};
