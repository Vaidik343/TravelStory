import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Redirect, Tabs } from "expo-router";
import { useWindowDimensions } from "react-native";

import FloatingTabButton from "../../components/FloatingTabButton";
import { useAuth } from "../../context/AuthContext";

const Layout = () => {
  const { isAuthenticated, loading } = useAuth();
  const { width, height } = useWindowDimensions();

  if (loading) return null;
  if (!isAuthenticated) return <Redirect href="/(auth)/Login" />;

  // 📐 Device-based calculations
  const isSmallDevice = height < 700;
  const isTablet = width >= 768;

  const TAB_BAR_HEIGHT = isTablet ? 80 : isSmallDevice ? 56 : 64;
  const BOTTOM_OFFSET = isTablet ? 24 : isSmallDevice ? 8 : 12;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#e68619",
        tabBarInactiveTintColor: "#8C7B6A",

        tabBarStyle: {
          position: "absolute",
          left: 16,
          right: 16,
          bottom: BOTTOM_OFFSET,
          height: TAB_BAR_HEIGHT,
          borderRadius: 20,

          backgroundColor: "#ffff",
          borderTopWidth: 0,

          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 6,
        },
      }}
    >
      <Tabs.Screen
        name="MyJourneys"
        options={{
          tabBarIcon: ({ color }) => (
            <EvilIcons name="location" size={30} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="CreateJourney"
        options={{
          tabBarButton: (props) => <FloatingTabButton {...props} />,
          tabBarIcon: () => (
            <FontAwesome6 name="plus" size={28} color="white" />
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
