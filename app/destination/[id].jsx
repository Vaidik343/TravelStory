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
import api from "../../api/axiosInstance";
import { ENDPOINTS } from "../../api/endpoints";
import { SafeAreaView } from "react-native-safe-area-context";

const DestinationDetail = () => {
  const { id } = useLocalSearchParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(ENDPOINTS.STORY.GET_BY_ID(id));
        setStory(data);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to load destination");
        console.error("Error fetching story:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStory();
    }
  }, [id]);

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

  if (error || !story) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-[#f8f6f1]">
        <Text className="text-lg font-semibold text-gray-900">
          {error || "Destination not found"}
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

  const validImages =
    story.images?.filter((img) => img && img.trim().length > 0) || [];
  const displayDate = new Date(story.visitDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <SafeAreaView className="flex-1 bg-[#f8f6f1]">
      <FlatList
        data={validImages}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 24,
          marginBottom: 12,
        }}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            className="w-[47%] h-40 rounded-lg"
            resizeMode="cover"
          />
        )}
        ListHeaderComponent={
          <View>
            {/* Hero Image Section */}
            <View className="relative h-64 overflow-hidden mb-6">
              <Image
                source={{
                  uri: validImages[0] || "https://via.placeholder.com/400",
                }}
                className="w-full h-full"
                resizeMode="cover"
              />
              {/* Dark Overlay */}
              <View className="absolute inset-0 bg-black/35" />

              {/* Back Button */}
              <Pressable
                onPress={handleBackPress}
                className="absolute top-4 left-4 bg-white/20 rounded-full p-2 z-10"
              >
                <Text className="text-white text-xl">←</Text>
              </Pressable>

              {/* Destination Info Overlay */}
              <View className="absolute bottom-0 left-0 right-0 p-6">
                <Text className="text-white text-2xl font-bold mb-2">
                  {story.placeName}
                </Text>
                <Text className="text-white/90 text-sm">📅 {displayDate}</Text>
              </View>
            </View>

            {/* Photos Section */}
            {validImages.length > 0 && (
              <View className="px-6 mb-6">
                <Text className="text-gray-900 text-base font-medium mb-3">
                  📸 Photos ({validImages.length})
                </Text>
              </View>
            )}
          </View>
        }
        ListFooterComponent={
          <View className="px-6 pb-6">
            {/* My Story Section */}
            <View className="mb-4">
              <Text className="text-gray-950 text-xl font-bold mb-3">
                My Story
              </Text>
              <Text className="text-gray-700 text-base leading-6">
                {story.story}
              </Text>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center px-6 py-20">
            <Text className="text-lg font-semibold text-gray-900 mb-2">
              No Photos
            </Text>
            <Text className="text-gray-600 text-center">
              No photos uploaded for this destination.
            </Text>
          </View>
        }
        scrollEnabled={true}
      />
    </SafeAreaView>
  );
};

export default DestinationDetail;
