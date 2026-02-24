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

    // Handle FormData - explicitly set Content-Type for React Native
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    // Log outgoing requests for debugging
    console.log("📤 ~ Axios Request:", {
      method: config.method,
      url: config.url,
      headers: config.headers,
      dataType: config.data?.constructor?.name || typeof config.data,
    });

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

    // Retry mechanism for network errors (e.g., Render sleep mode)
    if (error.code === "ERR_NETWORK" && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("🔄 ~ Retrying request after network error...");

      // Wait a bit before retrying (gives Render time to wake up)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      try {
        return await api(originalRequest);
      } catch (retryError) {
        originalRequest._retry = false;
        return Promise.reject(retryError);
      }
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== ENDPOINTS.AUTH.REFRESH
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        const { data } = await api.post(ENDPOINTS.AUTH.REFRESH, {
          refreshToken,
        });

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
