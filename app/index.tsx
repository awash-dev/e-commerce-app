import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, View, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter

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
                <Text>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.productContainer}
                        onPress={() => {
                            // Navigate to the product detail page with the product ID
                            router.push(`/product/${item._id}`); // Use the correct path for navigation
                        }}
                    >
                        <Image
                            source={{ uri: `http://localhost:3000/img/${item.image}` }}
                            style={styles.productImage}
                        />
                        <Text>Category: {item.category}</Text>
                        <Text style={styles.productName}>Name: {item.name}</Text>
                        <Text style={styles.productPrice}>Price: {item.price} birr</Text>
                    </TouchableOpacity>
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
    },
    productContainer: {
        flex: 1,
        margin: 10,
        alignItems: 'center',
        backgroundColor: '#d3d3d3',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    productImage: {
        width: 140,
        height: 150,
        resizeMode: 'contain',
    },
    productName: {
        textAlign: 'center',
    },
    productPrice: {
        textAlign: 'center',
    },
});
