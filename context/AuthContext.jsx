import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ENDPOINTS } from "../api/endpoints";
import api from "./../api/axiosInstance";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  //restore token on app start

  const restoreSession = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (token) {
        setAccessToken(token);
        setIsAuthenticated(true);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    restoreSession();
  }, []);

  // login

  const login = useCallback(async (payload) => {
    setLoading(true);
    try {
      const { data } = await api.post(ENDPOINTS.AUTH.LOGIN, payload);
      console.log("🔐 ~ login ~ data:", data);

      await AsyncStorage.setItem("accessToken", data.accessToken);
      await AsyncStorage.setItem("refreshToken", data.refreshToken);

      setAccessToken(data.accessToken);
      setIsAuthenticated(true);

      return data;
    } catch (error) {
      console.log("🔐 ~ login ~ error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      await api.post(ENDPOINTS.AUTH.LOGOUT, { refreshToken });
    } finally {
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
      setAccessToken(null);
      setIsAuthenticated(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      accessToken,
      isAuthenticated,
      loading,
      login,
      logout,
    }),
    [accessToken, isAuthenticated, loading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
