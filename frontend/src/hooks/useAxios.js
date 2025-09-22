// src/hooks/useAxios.js
import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

const useAxios = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const axiosInstance = axios.create({
    baseURL: API_BASE_URL || "http://localhost:5000/api",
  });

  // Add token to requests
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      setLoading(true);
      return config;
    },
    (error) => {
      setLoading(false);
      return Promise.reject(error);
    }
  );

  // Handle responses
  axiosInstance.interceptors.response.use(
    (response) => {
      setLoading(false);
      return response;
    },
    (error) => {
      setLoading(false);
      setError(error.response?.data?.message || "Something went wrong");
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );

  const clearError = () => setError(null);

  return { axios: axiosInstance, loading, error, clearError };
};

export default useAxios;
