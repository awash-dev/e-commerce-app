import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, View, ActivityIndicator, StyleSheet, Pressable } from 'react-native';
import { Link, useRouter } from 'expo-router'; // Import useRouter

export default function HomeScreen() {
    const router = useRouter(); // Initialize the router
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const URL = 'http://localhost:3000/api/products'; // Adjust based on your API
        try {
            const response = await fetch(URL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={({ item }) => (
                    <View style={styles.productContainer}>
                        <Link href={`/product/${item.slug || item._id}`} style={styles.link} asChild>
                            <Pressable style={styles.product}>
                                <Image
                                    source={{ uri: `http://localhost:3000/img/${item.image}` }}
                                    style={styles.productImage}
                                />
                                <Text style={styles.productName}>Name: {item.name}</Text>
                                <Text style={styles.productPrice}>Price: {item.price} birr</Text>

                            </Pressable>
                        </Link>
                    </View>
                )}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5', // Light background for contrast
    },
    productContainer: {
        flex: 1,
        margin: 5,
        alignItems: 'center',
        backgroundColor: '#ffffff', // White background for products
        borderRadius: 10,
        paddingTop: 20,
        elevation: 3, // Shadow effect for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    product:{
        flex:1,
    },
    productImage: {
        width: '100%', // Full width for the image
        height: 120,
        marginBottom :15,
        resizeMode: 'contain',
        borderRadius: 10, // Rounded corners for images
    },
    productName: {
        textAlign: 'left', // Align text to the left
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 5,
        width: '100%', // Full width for text
    },
    productPrice: {
        textAlign: 'left', // Align text to the left
        color: '#28a745', // Green color for price
        fontSize: 14,
        width: '100%', // Full width for text
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
    },
    link: {
        width: '100%', // Ensure the link takes full width
        padding: 10, // Add padding for touchable area
    },
});
