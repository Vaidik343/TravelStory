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
          headerShown: false,
          // tabBarIcon:({focused}) => (
          //     <TabIcon
          //      focused={focused}
          //     source
          //     />
          // )
        }}
      />
      <Tabs.Screen
        name="CreateJourney"
        options={{
          title: "Create",
          headerShown: false,
          // tabBarIcon:({focused}) => (
          //     <TabIcon
          //      focused={focused}
          //     source
          //     />
          // )
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          headerShown: false,
          // tabBarIcon:({focused}) => (
          //     <TabIcon
          //      focused={focused}
          //     source
          //     />
          // )
        }}
      />
    </Tabs>
  );
};

export default Layout;
