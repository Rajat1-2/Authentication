import api from "../../services/axios";

export const registerUser = async data => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const loginUser = async data => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const verifyOTP = async data => {
  const res = await api.post("/auth/verifyotp", data);
  return res.data;
};

export const getMe = async () => {
  const res = await api.get("/auth/get-me");
  return res.data;
};

export const logout = async () => {
  const res = await api.get("/auth/logout");
  return res.data;
};

export const logoutAll = async () => {
  const res = await api.get("/auth/logoutAll");
  return res.data;
};

export const refreshToken = async () => {
  const res = await api.get("/auth/refreshtoken");
  return res.data;
};

export const refreshAccessToken = async () => {
  const res = await api.get("/auth/refreshtoken");
  return res.data;
};
export const getCurrentUser = async () => {
  const res = await api.get("/auth/get-me");
  return res.data;
};