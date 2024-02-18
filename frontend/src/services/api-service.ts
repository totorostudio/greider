import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import {getToken} from './token-service';
import {BACKEND_URL} from '../const';

enum HttpStatus {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

const isError = (response: AxiosResponse) => Object.values(HttpStatus).includes(response.status);

const REQUEST_TIMEOUT = 5000;

export const handleApiError = (error: AxiosError<{ error: string }>): void => {
  if (error.response && isError(error.response)) {
    console.error('API error:', error.response.data.error);
  }
  throw error;
};

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });
  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{error: string}>) => {
      if (error.response && isError(error.response)) {
        handleApiError(error);
      }

      throw error;
    }
  );

  return api;
};
