import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ENDPOINTS } from "./endpoints";

const api = axios.create({
  baseURL: "https://journey-tales.onrender.com/api",
  timeout: 60000,
});

/**
 * Attach access token to every request
 */
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log outgoing requests for debugging
    console.log("📤 ~ Axios Request:", {
      method: config.method,
      url: config.url,
      headers: config.headers,
      dataType: config.data?.constructor?.name || typeof config.data,
    });

    // Don't manually set Content-Type for FormData - let axios handle it
    // axios automatically sets the correct Content-Type with boundary for FormData

    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * Refresh token on 401
 */
api.interceptors.response.use(
  (response) => {
    console.log("📥 ~ Axios Response:", {
      status: response.status,
      url: response.config?.url,
    });
    return response;
  },
  async (error) => {
    console.log("❌ ~ Axios Error:", {
      code: error.code,
      message: error.message,
      status: error.response?.status,
      url: error.config?.url,
    });

    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== ENDPOINTS.AUTH.REFRESH
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        const { data } = await api.post(ENDPOINTS.AUTH.REFRESH, { refreshToken });

        await AsyncStorage.setItem("accessToken", data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        await AsyncStorage.removeItem("accessToken");
        await AsyncStorage.removeItem("refreshToken");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
