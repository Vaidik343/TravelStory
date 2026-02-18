import { Stack } from "expo-router";
import "./globals.css"; // load Tailwind styles

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
    </Stack>
  );
}
