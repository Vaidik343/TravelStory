import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function AuthLayout() {
  const { isAuthenticated, loading } = useAuth();

  // Wait until token restore finishes
  if (loading) return null;

  // Already logged in → go to app
  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  // Not logged in → allow auth screens
  return <Stack screenOptions={{ headerShown: false }} />;
}
