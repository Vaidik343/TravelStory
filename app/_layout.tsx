import * as Network from "expo-network";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TripProvider } from "../context/TripContext";
import { syncAll } from "../services/sync.service";
import { AuthProvider } from "./../context/AuthContext";
import { BucketListProvider } from "./../context/BucketListContext";
import { StoryProvider } from "./../context/StoryContext";
import { UserProvider } from "./../context/UserContext";
import { WishListProvider } from "./../context/WishListContext";
import { initDB } from "./../db/schema";
import "./globals.css";

export default function Layout() {
  useEffect(() => {
    // 1️⃣ Initialize SQLite tables
    initDB();

    // 2️⃣ Sync once on app start (if online)
    const initialSync = async () => {
      const state = await Network.getNetworkStateAsync();
      if (state.isConnected && state.isInternetReachable) {
        await syncAll();
      }
    };

    initialSync();

    // 3️⃣ Listen for network changes (AUTO SYNC)
    const subscription = Network.addNetworkStateListener((state) => {
      if (state.isConnected && state.isInternetReachable) {
        syncAll();
      }
    });

    // 4️⃣ Cleanup listener
    return () => {
      subscription && subscription.remove();
    };
  }, []);

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
                      name="destination"
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
