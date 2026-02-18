import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import TripCard from "../../components/TripCard";
import { useTrip } from "../../context/TripContext";

const MyJourneys = () => {
  const { trips, loading, getAllTrips } = useTrip();
  const router = useRouter();

  useEffect(() => {
    getAllTrips();
  }, []);

  const handleCreateTrip = () => {
    router.push("/(tabs)/CreateJourney");
  };

  const handleTripPress = (tripId) => {
    // Navigate to trip details - update this route as needed
    router.push(`/trip/${tripId}`);
  };

  const renderEmptyState = () => (
    <View className="flex-1 justify-center items-center px-6">
      <Text className="text-2xl font-bold text-gray-900 mb-2">
        No Journeys Yet
      </Text>
      <Text className="text-gray-600 text-center mb-6">
        Start creating your travel stories! Create your first journey to
        document your adventures.
      </Text>
      <CustomButton
        title="Create Your First Journey"
        onPress={handleCreateTrip}
        className="w-full"
      />
    </View>
  );

  const renderHeader = () => (
    <View className="px-6 mb-6">
      <Text className="text-[#e68619] text-sm font-semibold mb-2">
        TRAVEL JOURNAL
      </Text>
      <Text className="text-3xl font-bold text-gray-900 mb-1">My Journeys</Text>
      <Text className="text-gray-600">
        {trips.length} trip{trips.length !== 1 ? "s" : ""} documented
      </Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#e68619" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {trips.length === 0 ? (
        <View className="flex-1">
          {renderHeader()}
          {renderEmptyState()}
        </View>
      ) : (
        <FlatList
          data={trips}
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
          ListHeaderComponent={renderHeader}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 20 }}
          scrollEnabled={true}
        />
      )}
    </SafeAreaView>
  );
};

export default MyJourneys;
