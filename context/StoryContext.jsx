import { createContext, useCallback, useContext, useMemo, useState } from "react";
import api from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";

const StoryContext = createContext(null);

export const StoryProvider = ({children}) => {

    const [story, setStory] = useState([]);
    const [loading, setLoading] = useState(false);
    
    //create story

    const createStories = useCallback(async (payload) => {
        try {
            const {data} = await api.post(ENDPOINTS.STORY.CREATE,payload);
          setStory(...data);
        return true || res.data
        } catch (error) {
            throw error
        }

    },[])

    // update 
    const updateStories = useCallback(async(payload,id) => {
        try {
            const {data} = await api.put(ENDPOINTS.STORY.UPDATE_BY_ID(id),payload);
            setStory(...data);
            return true || res.data
        } catch (error) {
            throw error
        }
    })

    const deleteStories = useCallback(async(id) => {
        try {
            const {data} = await api.delete(ENDPOINTS.STORY.DELETE(id));
            setStory(...data);
            return true || res.data
        } catch (error) {
            throw error
        }
    })

    const value = useMemo( () => {
        story,loading, createStories, updateStories, deleteStories
    })
    return <StoryContext.Provider value={value}></StoryContext.Provider>

}

export const useStory = () => {
    const context = useContext(StoryContext)
     if (!context) {
    throw new Error("useStory must be used inside Provider");
  }

  return context;
}