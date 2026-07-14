import axios from "axios";

import { store } from "../app/store";

import { loginSuccess, logout } from "../features/auth/authSlice";

const api = axios.create({
  baseURL: "http://localhost:3000/api",

  withCredentials: true,
});

api.interceptors.request.use(config => {
  const token = store.getState().auth.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  res => res,

  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = await axios.get(
          "http://localhost:3000/api/auth/refreshtoken",

          {
            withCredentials: true,
          }
        );

        const accessToken = refresh.data.accesstoken;

        const user = store.getState().auth.user;

        store.dispatch(
          loginSuccess({
            user,

            accessToken,
          })
        );

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (err) {
        store.dispatch(logout());

        window.location = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
