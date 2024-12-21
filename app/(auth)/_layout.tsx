import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen
                name="login"
                options={{
                    headerShown: false,
                    title: 'Login', // Optional: Set a title for better UX
                    headerBackTitleVisible: false // Show back title
                }}
            />
            <Stack.Screen
                name="register"
                options={{
                    headerShown: false,
                    title: 'Register', // Optional: Set a title for better UX
                    headerBackTitleVisible: false // Show back title
                }}
            />
        </Stack>
    );
}
