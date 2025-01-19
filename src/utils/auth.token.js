import API from "../api";
import axios from "axios";
import history from "./history";
import { setSnackbar } from "./global.actions";
//=========================================================
// interseptor code to set header for all requests
//=========================================================

API.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("authToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
API.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      localStorage.clear();
      sessionStorage.clear();
      history.push("/");
    } else {
    }
    return Promise.reject(error);
  }
);
export default axios;

//==================================================

export const setAuthTokenToEachRequest = (token) => {
  // if (token) {
  //   API.defaults.headers.common = { Authorization: `Bearer ${token}` };
  // } else {
  //   delete API.defaults.headers.common.Authorization;
  // }
};

export const getAuthToken = () => localStorage.getItem("authToken");
export const saveAuthToken = (token) =>
  token ? localStorage.setItem("authToken", token) : false;
export const removeAuthToken = () => {
  localStorage.removeItem("all_permissions");
  localStorage.removeItem("view_permissions");
  localStorage.removeItem("authToken");
  localStorage.removeItem("role");
};
