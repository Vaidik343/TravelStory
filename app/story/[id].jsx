import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../../api/axiosInstance";
import { ENDPOINTS } from "../../api/endpoints";
import DestinationCard from "../../components/DestinationCard";

const StoryDetail = () => {
  const { id } = useLocalSearchParams();
  const [trip, setTrip] = useState(null);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTripAndStories = async () => {
      try {
        setLoading(true);

        // Fetch trip details
        const tripResponse = await api.get(ENDPOINTS.TRIP.GET_BY_ID(id));
        setTrip(tripResponse.data);

        // Fetch all stories and filter by tripId
        const storiesResponse = await api.get(ENDPOINTS.STORY.ALL);
        const allStories = Array.isArray(storiesResponse.data)
          ? storiesResponse.data
          : storiesResponse.data?.stories || [];

        // Filter stories for this trip
        const tripStories = allStories.filter((story) => story.tripId === id);
        setStories(tripStories);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to load trip");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTripAndStories();
    }
  }, [id]);

  const handleDestinationPress = (story) => {
    // Navigate to story/destination details - adjust route as needed
    router.push(`/destination/${story.id}`);
  };

  const handleAddStory = () => {
    router.push(`/story/story-form?id=${id}`);
  };

  const handleBackPress = () => {
    router.back();
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-[#f8f6f1]">
        <ActivityIndicator size="large" color="#e68619" />
      </SafeAreaView>
    );
  }

  if (error || !trip) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-[#f8f6f1]">
        <Text className="text-lg font-semibold text-gray-900">
          {error || "Trip not found"}
        </Text>
        <Pressable
          onPress={handleBackPress}
          className="mt-4 bg-[#e68619] px-6 py-2 rounded-lg"
        >
          <Text className="text-white font-semibold">Go Back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#f8f6f1]">
      <FlatList
        data={stories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DestinationCard
            title={item.placeName}
            date={item.visitDate}
            text={item.story}
            image={
              item.images?.find((img) => img && img.trim().length > 0) ||
              "https://via.placeholder.com/100"
            }
            onPress={() => handleDestinationPress(item)}
          />
        )}
        ListHeaderComponent={
          <View>
            {/* Cover Image */}
            <View className="relative h-64 overflow-hidden">
              <Image
                source={{
                  uri: trip.coverImage || "https://via.placeholder.com/400",
                }}
                className="w-full h-full"
                resizeMode="cover"
              />
              {/* Dark Overlay */}
              <View className="absolute inset-0 bg-black/30" />

              {/* Back Button */}
              <Pressable
                onPress={handleBackPress}
                className="absolute top-4 left-4 bg-white/20 rounded-full p-2 z-10"
              >
                <Text className="text-white text-xl">←</Text>
              </Pressable>

              {/* Trip Info Overlay */}
              <View className="absolute bottom-0 left-0 right-0 p-6">
                <Text className="text-white text-3xl font-bold mb-2">
                  {trip.title}
                </Text>
                <View className="flex-row items-center">
                  <Text className="text-white/90 text-sm">
                    📅 {new Date(trip.startDate).toLocaleDateString()} -{" "}
                    {new Date(trip.endDate).toLocaleDateString()}
                  </Text>
                  <Text className="text-white/90 text-sm ml-3">
                    📍 {stories.length} destination
                    {stories.length !== 1 ? "s" : ""}
                  </Text>
                </View>
              </View>
            </View>

            {/* Add Story Button */}
            <View className="px-2 py-2 mt-3 flex-row justify-end">
              <Pressable
                onPress={handleAddStory}
                className="bg-[#e68619] px-4 py-2 rounded-xl "
              >
                <Text className="text-white font-semibold">+ Add Story</Text>
              </Pressable>
            </View>

            {/* Destinations Header */}
            <View className="px-6 py-4">
              <Text className="text-xl font-bold text-gray-950">
                Destinations
              </Text>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center px-6 py-20">
            <Text className="text-lg font-semibold text-gray-900 mb-2">
              No Destinations Yet
            </Text>
            <Text className="text-gray-600 text-center">
              No stories added to this trip yet.
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 20 }}
        scrollEnabled={true}
      />
    </SafeAreaView>
  );
};

export default StoryDetail;
