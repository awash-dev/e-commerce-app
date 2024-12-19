import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="Cart" options={{ headerShown: false }} />
      <Stack.Screen name="Profile" options={{ headerShown: false }} />
    </Stack>
  );
}
