import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import api from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";

const StoryContext = createContext(null);

export const StoryProvider = ({ children }) => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);

  //create story

  const createStory = useCallback(async (payload) => {
    setLoading(true);
    try {
      const { data } = await api.post(ENDPOINTS.STORY.CREATE, payload);
      setStories((prev) => [...prev, data]);
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  //get all stories
  const getAllStories = useCallback(async (payload) => {
    try {
      const { data } = await api.get(ENDPOINTS.STORY.ALL, payload);
      console.log("🚀 ~ StoryProvider ~ data:", data);
      setStories(...data);
      return true || res.data;
    } catch (error) {
      throw error;
    }
  }, []);

  //by id
  const getStoriesById = useCallback(async (payload) => {
    try {
      const { data } = await api.get(ENDPOINTS.STORY.GET_BY_ID, payload);
      console.log("🚀 ~ StoryProvider ~ data:", data);
      setStories(...data);
      return true || res.data;
    } catch (error) {
      throw error;
    }
  }, []);

  // update
  const updateStories = useCallback(async (payload, id) => {
    try {
      const { data } = await api.put(ENDPOINTS.STORY.UPDATE_BY_ID(id), payload);
      setStories(...data);
      return true || res.data;
    } catch (error) {
      throw error;
    }
  });

  const deleteStories = useCallback(async (id) => {
    try {
      const { data } = await api.delete(ENDPOINTS.STORY.DELETE(id));
      setStories(...data);
      return true || res.data;
    } catch (error) {
      throw error;
    }
  });

  const value = useMemo(
    () => ({
      stories,
      loading,
      createStory,
      updateStories,
      getAllStories,
      getStoriesById,
      deleteStories,
    }),
    [
      stories,
      loading,
      createStory,
      updateStories,
      getAllStories,
      getStoriesById,
      deleteStories,
    ],
  );
  return (
    <StoryContext.Provider value={value}>{children}</StoryContext.Provider>
  );
};

export const useStory = () => {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error("useStory must be used inside Provider");
  }

  return context;
};
