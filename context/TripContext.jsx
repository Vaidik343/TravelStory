import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import api from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";

const TripContext = createContext(null);

export const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);

  //create trip
  const createTrip = useCallback(async (formData) => {
    const { data } = await api.post(ENDPOINTS.TRIP.CREATE, formData);

    // append new trip instead of replacing all
    setTrips((prev) => [data, ...prev]);
    return data;
  }, []);

  //all trips
  const getAllTrips = useCallback(async () => {
    try {
      const { data } = await api.get(ENDPOINTS.TRIP.ALL);
      console.log("🚀 ~ TripProvider ~ data:", data);
      // Handle both array and nested object responses
      const tripsData = Array.isArray(data) ? data : data?.trips || [];
      setTrips(tripsData);
      return true || res.data;
    } catch (error) {
      throw error;
    }
  }, []);

  const getTripsById = useCallback(async (id) => {
    try {
      const { data } = await api.get(ENDPOINTS.TRIP.GET_BY_ID(id));
      // Handle both array and nested object responses
      const tripData = Array.isArray(data) ? data[0] : data;
      return tripData;
    } catch (error) {
      throw error;
    }
  }, []);

  const updateTrip = useCallback(async (payload, id) => {
    try {
      const { data } = await api.put(ENDPOINTS.TRIP.UPDATE_BY_ID(id), payload);
      setTrips((prev) =>
        prev.map((u) => (u.id === id ? { ...u, ...data } : u)),
      );
      return true || res.data;
    } catch (error) {
      throw error;
    }
  }, []);

  const deleteTrip = useCallback(async (id) => {
    try {
      const { data } = await api.delete(ENDPOINTS.TRIP.DELETE(id));
      setTrips((prev) =>
        prev.map((u) => (u.id === id ? { ...u, ...data } : u)),
      );
      return true || res.data;
    } catch (error) {
      throw error;
    }
  }, []);

  const value = useMemo(
    () => ({
      trips,
      loading,
      createTrip,
      getTripsById,
      getAllTrips,
      updateTrip,
      deleteTrip,
    }),
    [
      trips,
      createTrip,
      getAllTrips,
      getTripsById,
      updateTrip,
      deleteTrip,
      loading,
    ],
  );

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
};

export const useTrip = () => {
  const context = useContext(TripContext);

  if (!context) {
    throw new Error("useTrip must be used inside Provider");
  }

  return context;
};
