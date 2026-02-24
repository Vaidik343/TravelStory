import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TripCard from "../../components/TripCard";
import { useTrip } from "../../context/TripContext";

const arrowDown = "../../assets/json/Arrow-down.json";
const hello = "../../assets/json/Hello.json";

const MyJourneys = () => {
  const { trips, loading, getAllTrips } = useTrip();

  useEffect(() => {
    getAllTrips();
  }, []);

  const handleTripPress = (tripId) => {
    router.push(`/story/${tripId}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f8f0da]">
      <FlatList
        // data={Array.isArray(trips) ? trips : []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TripCard
            title={item.title}
            startDate={item.startDate}
            endDate={item.endDate}
            coverImage={item.coverImage}
            places={item.places?.length || 0}
            onPress={() => handleTripPress(item.id)}
          />
        )}
        ListHeaderComponent={
          <View className="px-6 py-3 ">
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
            <View className="flex-1 justify-center  items-center py-2">
              <ActivityIndicator size="large" color="#e68619" />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LottieView
                source={require(hello)}
                autoPlay
                loop
                style={{ width: 380, height: 300, marginTop: 0 }}
              />
              <Text className="text-2xl font-bold text-gray-900 mt-10">
                No Tales Yet
              </Text>
              <Text className="text-gray-700 text-mg text-center">
                Don't worry, start writing your adventurous tales here
              </Text>
              <LottieView
                source={require(arrowDown)}
                autoPlay
                loop
                style={{
                  width: 320,
                  height: 280,
                  marginTop: 50,
                  marginRight: 50,
                }}
              />
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
