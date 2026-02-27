import * as Network from "expo-network";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TripProvider } from "../context/TripContext";
import { syncAll } from "../services/sync.service";
import { AuthProvider, useAuth } from "./../context/AuthContext";
import { BucketListProvider } from "./../context/BucketListContext";
import { StoryProvider } from "./../context/StoryContext";
import { UserProvider } from "./../context/UserContext";
import { WishListProvider } from "./../context/WishListContext";
import { initDB } from "./../db/schema";
import "./globals.css";

export default function Layout() {

  
  useEffect(() => {
    // 1️⃣ Initialize SQLite tables (async)
    const setupDB = async () => {
      try {
        await initDB();
        console.log("✅ Database setup complete");
      } catch (error) {
        console.error("❌ Database setup failed:", error);
      }
    };

    setupDB();

    // 2️⃣ Sync once on app start (if online)
    const initialSync = async () => {
      try {
        const state = await Network.getNetworkStateAsync();
        if (state.isConnected && state.isInternetReachable) {
          console.log("🌐 Online - starting initial sync");
          await syncAll();
        } else {
          console.log("📱 Offline - skipping initial sync");
        }
      } catch (error) {
        console.error("❌ Initial sync error:", error);
      }
    };

    // Wait a bit for DB to initialize before syncing
    setTimeout(initialSync, 1000);

    // 3️⃣ Listen for network changes (AUTO SYNC)
    const subscription = Network.addNetworkStateListener((state) => {
      if (state.isConnected && state.isInternetReachable) {
        console.log("🌐 Network restored - triggering sync");
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
