import { Redirect } from "expo-router";
import { useAuth } from "../context/AuthContext";

export default function Index() {
  const { isAuthenticated, loading } = useAuth();

  // Prevent flicker while auth loads
  if (loading) return null;

  if (isAuthenticated) {
    return <Redirect href={"/(tabs)" as any} />;
  }

  return <Redirect href={"/(auth)" as any} />;
}