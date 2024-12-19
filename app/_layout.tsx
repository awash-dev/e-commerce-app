import { Stack, useNavigation, Link } from "expo-router"; // Importing Stack, useNavigation, and Link
import "@/global.css"; // Global styles
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider"; // UI provider
import { FontAwesome } from "@expo/vector-icons"; // Importing Expo vector icons
import { View } from "react-native"; // Importing View for layout

export default function RootLayout() {
    return (
        <GluestackUIProvider>
            <Stack>
                <Stack.Screen
                    name="index"
                    options={{
                        title: "Awash Shop",
                        headerRight: () => (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Link href="/Cart" style={{ marginRight: 10 }}>
                                    <FontAwesome name="shopping-cart" size={28} style={{ color: 'green' }} />
                                </Link>
                                <Link href="/Profile" style={{ marginLeft: 20, marginRight: 10 }}>
                                    <FontAwesome name="user" size={28} style={{ color: 'blue' }} />
                                </Link>
                            </View>
                        ),
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
                    name="Cart" // Ensure you have a screen named "cart"
                    options={{
                        title: "Shopping Cart",
                        headerShown: true,
                    }}
                />
                <Stack.Screen
                    name="profile" // Ensure you have a screen named "profile"
                    options={{
                        title: "Profile",
                        headerShown: true,
                    }}
                />
            </Stack>
        </GluestackUIProvider>
    );
}
