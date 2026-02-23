import { Stack } from "expo-router";
import { TripProvider } from "../context/TripContext";
import { AuthProvider } from "./../context/AuthContext";
import { StoryProvider } from "./../context/StoryContext";
import { UserProvider } from "./../context/UserContext";
import "./globals.css";

export default function Layout() {
  return (
    <AuthProvider>
      <UserProvider>
        <TripProvider>
          <StoryProvider>
            {/* <WishListProvider>
            <BucketListProvider> */}
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen
                name="destination/[id]"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="story" options={{ headerShown: false }} />
            </Stack>
            {/* </BucketListProvider>
          </WishListProvider> */}
          </StoryProvider>
        </TripProvider>
      </UserProvider>
    </AuthProvider>
  );
}
