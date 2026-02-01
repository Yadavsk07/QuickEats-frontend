import api from "./api";

export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await api.post("/auth/register", {
    name: data.name,
    email: data.email || "",
    phone: data.phone || "",
    password: data.password
  });
  return res.data;
};

export const sendOtp = async (data) => {
  const res = await api.post("/password/request-reset", { identifier: data.identifier });
  return res.data;
};

export const verifyOtp = async (identifier, otp) => {
  const res = await api.post("/password/verify-otp", { identifier, otp });
  return res.data;
};

export const resetPassword = async (data) => {
  const res = await api.post("/password/reset-password", {
    identifier: data.identifier,
    otp: data.otp,
    newPassword: data.newPassword
  });
  return res.data;
};
