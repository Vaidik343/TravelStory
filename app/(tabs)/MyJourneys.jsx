import EvilIcons from "@expo/vector-icons/EvilIcons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { SafeAreaView } from "react-native-safe-area-context";
import TripCard from "../../components/TripCard";
import { useTrip } from "../../context/TripContext";

const arrowDown = "../../assets/json/Arrow-down.json";
const hello = "../../assets/json/Hello.json";

const MyJourneys = () => {
  const { trips, loading, getAllTrips, deleteTrip } = useTrip();
  const swipeableRefs = useRef({});

  useEffect(() => {
    getAllTrips();
  }, []);

  const handleTripPress = (tripId) => {
    router.push(`/story/${tripId}`);
  };

  const confirmDelete = (tripId) => {
    Alert.alert("Delete Trip", "Are you sure you want to delete this trip?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          swipeableRefs.current[tripId]?.close();
          await deleteTrip(tripId);
        },
      },
    ]);
  };

  const renderRightActions = (id) => (
    <Pressable
      onPress={() => confirmDelete(id)}
      style={{
        backgroundColor: "#e68619",
        justifyContent: "center",
        alignItems: "center",
        width: 90,
        borderRadius: 20,
        marginVertical: 6,
      }}
    >
      <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
        Delete
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-base ">
      <FlatList
        data={Array.isArray(trips) ? trips : []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Swipeable
            ref={(ref) => (swipeableRefs.current[item.id] = ref)}
            renderRightActions={() => renderRightActions(item.id)}
            overshootRight={false}
            friction={2.5} //resistance
            rightThreshold={60} //must swipe enough
            onSwipeableWillOpen={() =>
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
            }
          >
            <TripCard
              title={item.title}
              startDate={item.startDate}
              endDate={item.endDate}
              coverImage={item.coverImage}
              places={item.places?.length || 0}
              onPress={() => handleTripPress(item.id)}
            />
          </Swipeable>
        )}
        ListHeaderComponent={
          <View className="mb-6">
            <View className="flex-row items-center mb-2 px-2">
              <EvilIcons name="location" size={24} color="#e68619" />
              <Text className="text-[#e68619] ml-1 font-semibold uppercase tracking-wide">
                Travel Journal
              </Text>
            </View>
            <View className="px-6">
              <Text className="text-2xl font-bold text-gray-950 mb-1">
                My Journeys
              </Text>
              <Text className="text-gray-700">
                {trips.length} trip{trips.length !== 1 ? "s" : ""} documented
              </Text>
            </View>
          </View>
        }
        ListEmptyComponent={
          loading ? (
            <View className="flex-1 justify-center items-center py-2">
              <ActivityIndicator size="large" color="#e68619" />
            </View>
          ) : (
            <View className="flex-1 justify-center items-center">
              <LottieView
                source={require(hello)}
                autoPlay
                loop
                style={{ width: 380, height: 300 }}
              />
              <Text className="text-2xl font-bold text-gray-900 mt-6">
                No Tales Yet
              </Text>
              <Text className="text-gray-700 text-center mt-1">
                Don't worry, start writing your adventurous tales here
              </Text>
              <LottieView
                source={require(arrowDown)}
                autoPlay
                loop
                style={{ width: 280, height: 240, marginTop: 40 }}
              />
            </View>
          )
        }
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

export default MyJourneys;
