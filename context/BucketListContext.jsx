import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import api from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";

const BucketListContext = createContext(null);

export const BucketListProvider = ({ children }) => {
  const [bucketList, setBucketList] = useState([]);
  const [loading, setLoading] = useState(false);

  //create bucket list
  const createBucketList = useCallback(async (payload) => {
    try {
      const { data } = await api.post(ENDPOINTS.BUCKETLIST.CREATE, payload);
      setBucketList((prev) => [data, ...prev]);
      return true;
    } catch (error) {
      throw error;
    }
  }, []);

  // all bucket list
  const getAllBucketList = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get(ENDPOINTS.BUCKETLIST.ALL);
      setBucketList(data);
    } finally {
      setLoading(false);
    }
  }, []);

  const getBucketListById = useCallback(async () => {
    try {
      const { data } = await api.get(ENDPOINTS.BUCKETLIST.GET_BY_ID);
      bucketList(data);
      return true || res.data;
    } catch (error) {
      throw error;
    }
  });

  const updateBucketList = useCallback(async (payload, id) => {
    try {
      const { data } = await api.put(
        ENDPOINTS.BUCKETLIST.UPDATE_BY_ID(id),
        payload,
      );
      setBucketList((prev) =>
        prev.map((u) => (u.id === id ? { ...u, ...data } : u)),
      );
      return true || res.data;
    } catch (error) {
      throw error;
    }
  });

  const deleteBucketList = useCallback(async (id) => {
    try {
      const { data } = await api.delete(ENDPOINTS.BUCKETLIST.DELETE(id));
      setBucketList((prev) => prev.filter((trip) => trip.id !== id));
      return true || res.data;
    } catch (error) {
      throw error;
    }
  });

  const value = useMemo(
    () => (
      {
        bucketList,
        loading,
        createBucketList,
        getAllBucketList,
        getBucketListById,
        updateBucketList,
        deleteBucketList,
      },
      [
        bucketList,
        loading,
        createBucketList,
        getAllBucketList,
        getBucketListById,
        updateBucketList,
        deleteBucketList,
      ]
    ),
  );

  return (
    <BucketListContext.Provider value={value}>
      {children}
    </BucketListContext.Provider>
  );
};

export const useBucketList = () => {
  const context = useContext(BucketListContext);

  if (!context) {
    throw new Error("useWishList must be used inside Provider");
  }

  return context;
};
