import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Tabs } from "expo-router";
//Tab icons

// const TabIcon = ({

// })
const Layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="MyJourneys"
        options={{
          title: "Trips",
          tabBarLabel: "Trips",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <EvilIcons name="location" size={30} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="CreateJourney"
        options={{
          title: "Create",
          headerShown: false,

          tabBarIcon: ({ focused }) => (
            <FontAwesome6 name="plus" size={28} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Feather name="user" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
