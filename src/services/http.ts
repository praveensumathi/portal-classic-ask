import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
  withCredentials: false, // Set the default credential configuration
});

const setBaseUrl = (url: string) => {
  axiosInstance.defaults.baseURL = url;
};

const useAxiosLoader = () => {
  const [counter, setCounter] = useState(0);

  const inc = useCallback(
    () => setCounter((counter) => counter + 1),
    [setCounter]
  ); // add to counter
  const dec = useCallback(
    () => setCounter((counter) => counter - 1),
    [setCounter]
  ); // remove from counter

  const interceptors = useMemo(
    () => ({
      request: (config) => {
        inc();
        return config;
      },
      response: (response) => {
        dec();
        return response;
      },
      error: (error) => {
        dec();
        return Promise.reject(error);
      },
    }),
    [inc, dec]
  ); // create the interceptors

  useEffect(() => {
    // add request interceptors
    axiosInstance.interceptors.request.use(
      interceptors.request,
      interceptors.error
    );

    // add response interceptors
    axiosInstance.interceptors.response.use(
      interceptors.response,
      interceptors.error
    );

    return () => {
      // remove all intercepts when done
      axiosInstance.interceptors.request.eject(interceptors.request as any);
      axiosInstance.interceptors.response.eject(interceptors.response as any);
      axiosInstance.interceptors.response.eject(interceptors.error as any);
    };
  }, [interceptors]);

  return [counter > 0];
};

export default useAxiosLoader;

const withCredentialsConfig = {
  withCredentials: true,
} as AxiosRequestConfig;

const withoutCredentialsConfig = {
  withCredentials: false,
} as AxiosRequestConfig;

const httpWithCredentials = {
  get: <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> =>
    axiosInstance.get<T>(url, { ...config, ...withCredentialsConfig }),
  post: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> =>
    axiosInstance.post<T>(url, data, { ...config, ...withCredentialsConfig }),
  delete: <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> =>
    axiosInstance.delete<T>(url, { ...config, ...withCredentialsConfig }),
  update: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> =>
    axiosInstance.put<T>(url, data, { ...config, ...withCredentialsConfig }),
};

const httpWithoutCredentials = {
  get: <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => axiosInstance.get<T>(url, config),
  post: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => axiosInstance.post<T>(url, data, config),
  delete: <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => axiosInstance.delete<T>(url, config),
  update: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => axiosInstance.put<T>(url, data, config),
};

const httpWithMultipartFormData = axiosInstance;
httpWithMultipartFormData.defaults.headers.common["Content-Type"] =
  "multipart/form-data";

export {
  httpWithCredentials,
  httpWithoutCredentials,
  httpWithMultipartFormData,
  setBaseUrl,
};
