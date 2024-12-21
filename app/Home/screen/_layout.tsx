import { Stack, Link } from "expo-router"; // Importing Stack, useNavigation, and Link
import { FontAwesome } from "@expo/vector-icons"; // Importing Expo vector icons
import { Text, View } from "react-native"; // Importing View for layout
import UseCart from "@/store/CartStore";
import DetailProduct from "../product/[id]";

export default function RootLayout() {
    const cartItemsNum = UseCart(state => state.items.length);
    return (
        <Stack>
            <Stack.Screen
                name="Home"
                options={{
                    title: "Awash Shop",
                    headerRight: () => (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Link href="/Home/screen/Cart" style={{ marginRight: 10 }}>
                                <FontAwesome name="shopping-cart" size={28} style={{ color: 'green' }} />
                                <View style={{
                                    flex: 1,
                                    width: 20,
                                    height: 20,
                                    borderRadius: 12,
                                    backgroundColor: 'red',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'absolute',
                                }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>{cartItemsNum}</Text>
                                </View>
                            </Link>
                            <Link href="/Home/screen/Profile" style={{ marginLeft: 20, marginRight: 10 }}>
                                <FontAwesome name="user" size={28} style={{ color: 'blue' }} />
                            </Link>
                        </View>
                    ),
                }}
            />

            <Stack.Screen
                name="Cart" // Ensure you have a screen named "cart"
                options={{
                    title: "Shopping Cart",
                    headerShown: true,
                    headerBackTitleVisible: true, // Added to show the back title
                }}
            />
            <Stack.Screen
                name="Profile" // Ensure you have a screen named "profile"
                options={{
                    title: "Profile",
                    headerShown: true,
                    headerBackTitleVisible: true, // Added to show the back title
                }}
            />
            <Stack>
                <Stack.Screen name='/Home/product/[id]' options={{ headerShown: true }} />
            </Stack>
        </Stack>
    );
}
