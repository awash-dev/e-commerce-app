import { Stack, Tabs } from "expo-router";
import { Ionicons } from 'react-native-vector-icons';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
export default function RootLayout() {
    return (
        <GluestackUIProvider>
            <Tabs>


                <Tabs.Screen
                    name="index"
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="home-outline" size={24} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="Cart"
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="cart-outline" size={24} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="Profile"
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="person-outline" size={24} color={color} />
                        ),
                    }}
                />
            </Tabs>
        </GluestackUIProvider>
    );
}
