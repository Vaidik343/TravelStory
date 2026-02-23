import Feather from "@expo/vector-icons/Feather";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../../api/axiosInstance";
import { ENDPOINTS } from "../../api/endpoints";
import { useAuth } from "../../context/AuthContext";
import { useTrip } from "../../context/TripContext";

const Profile = () => {
  const { logout } = useAuth();
  const { trips, getAllTrips } = useTrip();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    trips: 0,
    places: 0,
    photos: 0,
  });

  useFocusEffect(
    useCallback(() => {
      loadProfileData();
    }, []),
  );

  const loadProfileData = async () => {
    try {
      setLoading(true);

      // Fetch logged-in user profile
      const userRes = await api.get(ENDPOINTS.USER.CREATE); // /me endpoint
      const userData = userRes.data;

      // Extract first letter of name for avatar
      const initial =
        userData?.name?.charAt(0)?.toUpperCase() ||
        userData?.email?.charAt(0)?.toUpperCase() ||
        "U";
      setUser({
        name: userData?.name,
        email: userData?.email,
        initial,
      });

      // Fetch trips
      await getAllTrips();

      // Fetch all stories to count photos
      const storiesRes = await api.get(ENDPOINTS.STORY.ALL);
      const allStories = Array.isArray(storiesRes.data)
        ? storiesRes.data
        : storiesRes.data?.stories || [];

      // Count total images from all stories
      const totalPhotos = allStories.reduce((acc, story) => {
        const imageCount = Array.isArray(story.images)
          ? story.images.length
          : 0;
        return acc + imageCount;
      }, 0);

      // Calculate stats
      setStats({
        trips: trips?.length || 0,
        places: allStories?.length || 0, // Number of destinations/stories
        photos: totalPhotos, // Total images across all stories
      });
    } catch (error) {
      console.log("❌ ~ Error loading profile:", error.message);
      console.log("❌ ~ Response:", error.response?.status, error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: async () => {
          try {
            await logout();
            router.replace("/(auth)/Login");
          } catch (error) {
            console.log("Logout error:", error.message);
            // Still redirect even if logout API fails
            router.replace("/(auth)/Login");
          }
        },
      },
    ]);
  };

  const menuItems = [
    {
      label: "Edit Profile",
      icon: "edit-2",
      onPress: () => {
        /* Handle edit */
      },
    },
    {
      label: "Notifications",
      icon: "bell",
      onPress: () => {
        /* Handle notifications */
      },
    },
    {
      label: "Privacy",
      icon: "lock",
      onPress: () => {
        /* Handle privacy */
      },
    },
    {
      label: "Help & Support",
      icon: "help-circle",
      onPress: () => {
        /* Handle help */
      },
    },
    {
      label: "Log Out",
      icon: "log-out",
      onPress: handleLogout,
      isLogout: true,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#f8f6f1]">
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#e68619" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 12,
            paddingBottom: 40,
          }}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between mb-8">
            <Text className="text-3xl font-bold text-gray-950">Profile</Text>
            <Pressable className="p-2 rounded-full bg-white shadow-sm">
              <Feather name="settings" size={24} color="#8C7B6A" />
            </Pressable>
          </View>

          {/* Avatar & User Info */}
          <View className="items-center mb-8">
            <View className="w-20 h-20 rounded-full bg-[#f5ede3] items-center justify-center mb-4">
              <Text className="text-5xl font-bold text-[#e68619]">
                {user?.initial || "U"}
              </Text>
            </View>
            <Text className="text-2xl font-bold text-gray-950">
              {user?.name || "User"}
            </Text>
            <Text className="text-sm text-[#8C7B6A] mt-1">
              {user?.email || "user@app.com"}
            </Text>
          </View>

          {/* Stats Cards */}
          <View className="flex-row gap-4 mb-8">
            <View className="flex-1 bg-white rounded-2xl p-4 items-center shadow-sm">
              <Text className="text-2xl mb-2">📍</Text>
              <Text className="text-xl font-bold text-gray-950">
                {stats.trips}
              </Text>
              <Text className="text-xs text-[#8C7B6A] mt-1">Trips</Text>
            </View>
            <View className="flex-1 bg-white rounded-2xl p-4 items-center shadow-sm">
              <Text className="text-2xl mb-2">📖</Text>
              <Text className="text-xl font-bold text-gray-950">
                {stats.places}
              </Text>
              <Text className="text-xs text-[#8C7B6A] mt-1">Places</Text>
            </View>
            <View className="flex-1 bg-white rounded-2xl p-4 items-center shadow-sm">
              <Text className="text-2xl mb-2">📷</Text>
              <Text className="text-xl font-bold text-gray-950">
                {stats.photos}
              </Text>
              <Text className="text-xs text-[#8C7B6A] mt-1">Photos</Text>
            </View>
          </View>

          {/* Menu Items */}
          <View className="bg-white rounded-2xl overflow-hidden shadow-sm">
            {menuItems.map((item, index) => (
              <Pressable
                key={index}
                onPress={item.onPress}
                className={`flex-row items-center justify-between px-6 py-4 ${
                  index !== menuItems.length - 1
                    ? "border-b border-[#f5ede3]"
                    : ""
                } ${item.isLogout ? "bg-red-50" : ""}`}
              >
                <Text
                  className={`text-base font-medium ${
                    item.isLogout ? "text-red-600" : "text-gray-950"
                  }`}
                >
                  {item.label}
                </Text>
                <Feather
                  name="chevron-right"
                  size={20}
                  color={item.isLogout ? "#dc2626" : "#8C7B6A"}
                />
              </Pressable>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Profile;
