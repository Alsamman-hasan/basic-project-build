import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { enqueueSnackbar } from 'notistack';
// import { getRouteSignIn } from '../consts/router';

interface FailedRequests {
  resolve: (value: AxiosResponse) => void;
  reject: (value: AxiosError) => void;
  config: AxiosRequestConfig;
  error: AxiosError;
}

const baseURL = __IS_DEV__ ? process.env.API_URL_VEV : process.env.API_URL;
const api = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const reloadFun = () => {
  window.location.href = '/';
};

const serviceErrorFun = () => {
  enqueueSnackbar('ваша сессия закончилась, авторизуете пожалуйста ', {
    variant: 'error',
  });
  localStorage.clear();
  const intervalId = setInterval(reloadFun, 2000);
  setTimeout(() => {
    clearInterval(intervalId);
  }, 3000);
};

let failedRequests: FailedRequests[] = [];
let isTokenRefreshing = false;

api.interceptors.request.use(
  async config => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers = config.headers || {};
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error),
);
api.interceptors.response.use(
  response => response,
  async (errors: AxiosError) => {
    const status = errors.response?.status;
    const originalRequestConfig = errors.config!;
    if (status !== 401) return Promise.reject(errors);
    if (status === 401 && originalRequestConfig.url === 'users/auth/login')
      return Promise.reject(errors);

    if (isTokenRefreshing)
      return new Promise((resolve, reject) => {
        failedRequests.push({
          config: originalRequestConfig,
          error: errors,
          reject,
          resolve,
        });
      });

    isTokenRefreshing = true;

    try {
      const response = await axios.get(`${baseURL}users/auth/refresh`, {
        withCredentials: true,
      });
      const { accessToken = null } = response.data ?? {};
      if (!accessToken) serviceErrorFun();
      localStorage.setItem('ACCESS_TOKEN', accessToken);
      failedRequests.forEach(({ resolve, reject, config }) => {
        api(config)
          .then(res => resolve(res))
          .catch(e => reject(e));
      });
    } catch (_error: unknown) {
      serviceErrorFun();
      failedRequests.forEach(({ reject, error }) => reject(error));
      return Promise.reject(errors);
    } finally {
      failedRequests = [];
      isTokenRefreshing = false;
    }

    return api(originalRequestConfig);
  },
);

export const $api = api;
