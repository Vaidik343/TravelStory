import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import api from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  //add  image upload logic
  //create
  const createUser = useCallback(async (payload) => {
    try {
      const { data } = await api.post(ENDPOINTS.USER.CREATE, payload);
      console.log("🚀 ~ UserProvider ~ data:", data)
      setUser(data);
      return true || res.data;
    } catch (error) {
      console.log("🚀 ~ createUser ~ error:", error);
      throw error;
    }
  }, []);

  //login - profile detail

  // logout

  //get by id

  const getUserById = useCallback(async () => {
    try {
      const { data } = await api.get(ENDPOINTS.USER.GET_BY_ID);
      setUser(...data);
    } catch (error) {
      throw error;
    }
  });

  //update

  const updateUser = useCallback(async (payload, id) => {
    try {
      const { data } = await api.put(ENDPOINTS.USER.UPDATE_BY_ID(id));
      setUser((prev) =>
        prev.map((u) => (u.id === id ? { ...u, ...data } : u)),
      );
      return true || res.data;
    } catch (error) {
      console.log("🚀 ~ UserProvider ~ error:", error);
      throw error;
    }
  }, []);

  // delete account

  const deleteUser = useCallback(async (id) => {
    try {
      const { data } = await api.delete(ENDPOINTS.USER.DELETE(id));
      setUser(data);
      return true || res.data;
    } catch (error) {
      throw error;
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      createUser,
      getUserById,
      updateUser,
      deleteUser,
    }),
    [user, loading, createUser, getUserById, updateUser, deleteUser],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUsers must be used within UsersProvider");
  return context;
};
