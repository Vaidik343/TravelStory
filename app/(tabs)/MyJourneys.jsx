import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TripCard from "../../components/TripCard";
import { useTrip } from "../../context/TripContext";

const MyJourneys = () => {
  const { trips, loading, getAllTrips } = useTrip();

  useEffect(() => {
    getAllTrips();
  }, []);

  const handleTripPress = (tripId) => {
    router.push(`/story/${tripId}`);
  };
  return (
    <SafeAreaView className="flex-1 bg-[#f8f6f1]">
      <FlatList
        data={Array.isArray(trips) ? trips : []}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TripCard
            title={item.title}
            startDate={item.startDate}
            endDate={item.endDate}
            coverImage={item.coverImage}
            places={item.places?.length || 0}
            onPress={() => handleTripPress(item._id)}
          />
        )}
        ListHeaderComponent={
          <View className="px-6 mb-6">
            <Text className="text-[#e68619] text-sm font-semibold mb-2">
              Journey Tales
            </Text>
            <Text className="text-2xl font-bold text-gray-950 mb-1">
              My Tales
            </Text>
            <Text className="text-gray-700">
              {trips.length} trips{trips.length !== 1 ? "s" : ""} documented
            </Text>
          </View>
        }
        ListEmptyComponent={
          loading ? (
            <View className="flex-1 justify-center items-center py-20">
              <ActivityIndicator size="large" color="#e68619" />
            </View>
          ) : (
            <View className="flex-1 justify-center items-center px-6 py-20">
              <Text className="text-2xl font-bold text-gray-900 mb-2">
                No Tales Yet
              </Text>
              <Text className="text-gray-700 text-center mb-6">
                Don't worry start writing your adventurist tales here
              </Text>

              {/* <Image  /> */}
            </View>
          )
        }
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 20 }}
        scrollEnabled={true}
      />
    </SafeAreaView>
  );
};

export default MyJourneys;
