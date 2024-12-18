import { Stack } from "expo-router"; // Importing only Stack
import { Ionicons } from '@expo/vector-icons'; // Correct import statement
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

export default function RootLayout() {
    return (
        <GluestackUIProvider>
            <Stack>
                <Stack.Screen
                    name="index"
                    options={{
                        title: "Awash Shop",
                        headerShown: true,

                    }}
                />
                <Stack.Screen
                    name="product/[id]"
                    options={{
                        title: "Product Details",
                        headerShown: true,

                    }}
                />
                <Stack.Screen
                    name="Cart"
                    options={{
                        title: "Cart",
                        headerShown: true,

                    }}
                />
                <Stack.Screen
                    name="Profile"
                    options={{
                        title: "Profile",
                        headerShown: true,

                    }}
                />
            </Stack>
        </GluestackUIProvider>
    );
}
