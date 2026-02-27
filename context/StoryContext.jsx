import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import api from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";
import { v4 as uuidv4 } from "uuid";
import { isOnline } from "../services/network";
import { insertStoryLocal, getUnsyncedStories } from "../db/story.repo";

const StoryContext = createContext(null);

export const StoryProvider = ({ children }) => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load from sqlite on mount
  useEffect(() => {
    const loadLocalStories = async () => {
      const localStories = await getUnsyncedStories();
      if (localStories.length > 0) {
        console.log(`📱 Loaded ${localStories.length} local stories`);
        setStories(localStories);
      }
    };
    loadLocalStories();
  }, []);

  //create story
  const createStory = useCallback(
    async (
      payload,
      headers = {
        Accept: "application/json",
      },
    ) => {
      setLoading(true);
      try {
        const online = await isOnline();
        
        if (online) {
          // Online - save to server
          const { data } = await api.post(ENDPOINTS.STORY.CREATE, payload, {
            headers,
          });
          console.log("🚀 ~ StoryProvider ~ data:", data);
          setStories((prev) => [...prev, data]);
          return data;
        } else {
          // Offline - save to SQLite locally
          console.log("📱 Offline - saving story locally");
          const localStory = {
            ...payload,
            id: uuidv4(),
            isSynced: 0,
            updatedAt: new Date().toISOString(),
          };
          await insertStoryLocal(localStory);
          setStories((prev) => [...prev, localStory]);
          return localStory;
        }
      } catch (error) {
        console.error("❌ Error creating story:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  //get all stories
  const getAllStories = useCallback(async () => {
    try {
      const { data } = await api.get(ENDPOINTS.STORY.ALL);
      console.log("🚀 ~ StoryProvider ~ data:", data);
      setStories(data);
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
      setStories(data);
      return true || res.data;
    } catch (error) {
      throw error;
    }
  }, []);

  // update
  const updateStories = useCallback(async (payload, id) => {
    try {
      const { data } = await api.put(ENDPOINTS.STORY.UPDATE_BY_ID(id), payload);
      setStories((prev) =>
        prev.map((story) => (story.id === id ? data : story)),
      );
      return true || res.data;
    } catch (error) {
      throw error;
    }
  });

  const deleteStories = useCallback(async (id) => {
    try {
      const { data } = await api.delete(ENDPOINTS.STORY.DELETE(id));
      setStories((prev) => prev.filter((story) => story.id !== id));
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
