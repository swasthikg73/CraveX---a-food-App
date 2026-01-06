import axiosPrivate from "../api/axios.js";
import { StoreContext } from "../context/StoreContext";

import { useContext } from "react";
import { useEffect } from "react";

const useAxiosPrivate = () => {
  const token = localStorage.getItem("tokenCraveX");

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (token && !config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Incase of token refresh logic can be added here

    // axiosPrivate.interceptors.response.use(
    //   (response) => response,
    //   async (error) => {
    //     const prevRequest = error?.config;
    //     if (error?.response?.status === 403 && !prevRequest?.sent) {
    //       prevRequest.sent = true;
    //       //incase of token refresh logic can be added here
    //       return axiosPrivate(prevRequest);
    //     }
    //     return Promise.reject(error);
    //   }
    // );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("tokenCraveX");
          window.location.href = "/api/user/login";
        }
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [token]);

  return axiosPrivate;
};

export default useAxiosPrivate;
