import { Stack, Tabs } from "expo-router";
import { Ionicons } from 'react-native-vector-icons';
import "@/global.css";
// import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

export default function RootLayout() {
    return (
        // Uncomment if using Gluestack UI Provider
        // <GluestackUIProvider>
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Awash Shop',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="product/[id]"
                options={{
                    title: 'Product',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="book" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Cart"
                options={{
                    title: 'Cart',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="cart" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="person" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
        // </GluestackUIProvider> not
    );
}
