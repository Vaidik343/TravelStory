import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import api from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";
import { v4 as uuidv4 } from "uuid";
import { isOnline } from "../services/network";
import { insertWishlistLocal } from "../db/wishlist.repo";

const WishListContext = createContext(null);

export const WishListProvider = ({ children }) => {
  const [wishlist, setWishList] = useState([]);
  const [loading, setLoading] = useState(false);

  //create trip
  const createWishList = useCallback(async (payload) => {
    try {
      const online = await isOnline();
      
      if (online) {
        // Online - save to server
        const { data } = await api.post(ENDPOINTS.WISHLIST.CREATE, payload);
        setWishList((prev) => [data, ...prev]);
        return true || res.data;
      } else {
        // Offline - save to SQLite locally
        console.log("📱 Offline - saving wishlist locally");
        const localWishlist = {
          ...payload,
          id: uuidv4(),
          isSynced: 0,
          updatedAt: new Date().toISOString(),
        };
        await insertWishlistLocal(localWishlist);
        setWishList((prev) => [localWishlist, ...prev]);
        return localWishlist;
      }
    } catch (error) {
      console.error("❌ Error creating wishlist:", error);
      throw error;
    }
  }, []);

  const updateWishList = useCallback(async (payload, id) => {
    try {
      const { data } = await api.put(
        ENDPOINTS.WISHLIST.UPDATE_BY_ID(id),
        payload,
      );
      setWishList((prev) =>
        prev.map((u) => (u.id === id ? { ...u, ...data } : u)),
      );
      return true || res.data;
    } catch (error) {
      throw error;
    }
  });

  const deleteWishList = useCallback(async (id) => {
    try {
      const { data } = await api.delete(ENDPOINTS.WISHLIST.DELETE(id));
      setWishList((prev) => prev.filter((trip) => trip.id !== id));
      return true || res.data;
    } catch (error) {
      throw error;
    }
  });

  const value = useMemo(
    () => (
      {
        wishlist,
        loading,
        createWishList,
        updateWishList,
        deleteWishList,
      },
      [wishlist, loading, createWishList, updateWishList, deleteWishList]
    ),
  );

  return (
    <WishListContext.Provider value={value}>
      {children}
    </WishListContext.Provider>
  );
};

export const useWishList = () => {
  const context = useContext(WishListContext);

  if (!context) {
    throw new Error("useWishList must be used inside Provider");
  }

  return context;
};
