import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TripProvider } from "../context/TripContext";
import { AuthProvider } from "./../context/AuthContext";
import { BucketListProvider } from "./../context/BucketListContext";
import { StoryProvider } from "./../context/StoryContext";
import { UserProvider } from "./../context/UserContext";
import { WishListProvider } from "./../context/WishListContext";
import "./globals.css";
BucketListProvider;

export default function Layout() {
  return (
    <AuthProvider>
      <UserProvider>
        <TripProvider>
          <StoryProvider>
            <WishListProvider>
              <BucketListProvider>
                <GestureHandlerRootView style={{ flex: 1 }}>
                  <Stack>
                    <Stack.Screen
                      name="(tabs)"
                      options={{ headerShown: false, statusBarHidden: true }}
                    />
                    <Stack.Screen
                      name="(auth)"
                      options={{ headerShown: false, statusBarHidden: true }}
                    />
                    <Stack.Screen
                      name="destination/[id]"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="story"
                      options={{ headerShown: false, statusBarHidden: true }}
                    />
                  </Stack>
                </GestureHandlerRootView>
              </BucketListProvider>
            </WishListProvider>
          </StoryProvider>
        </TripProvider>
      </UserProvider>
    </AuthProvider>
  );
}
