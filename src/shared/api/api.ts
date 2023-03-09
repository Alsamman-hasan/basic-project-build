import axios from "axios";

const api = axios.create({
  baseURL: __API__,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
  },
});

api.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (config) => {
    const resData = config.data as Iresponse<unknown, unknown>;
    if (resData.error) {
      localStorage.clear();
    }
    return config;
  },
  async (error) => {
    localStorage.clear();
    return Promise.reject(error);
  }
);

export const $api = api;
