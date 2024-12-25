import { View, Text, Image, ActivityIndicator, StyleSheet, Button, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import UseCart from '@/store/CartStore';
import { FontAwesome } from "@expo/vector-icons"; // Importing Expo vector icons

const DetailProduct = () => {
    const { id } = useLocalSearchParams(); // Extracting product ID from URL parameters
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const addProduct = UseCart(state => state.addProduct); // Accessing addProduct from Zustand store
    const cartItemsNum = UseCart(state => state.items.length); // Getting number of items in cart

    useEffect(() => {
        fetchProductDetails();
    }, [id]);

    const fetchProductDetails = async () => {
        const URL = `https://backend-sand-six.vercel.app/api/products/list/${id}`; // API URL to fetch product details
        try {
            const response = await fetch(URL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProduct(data); // Setting the fetched product data
        } catch (error) {
            setError(error.message); // Handling errors
        } finally {
            setLoading(false); // Setting loading to false after fetching
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

    // Function to add product to cart
    const addToCart = () => {
        if (product) {
            addProduct(product); // Adding product to cart
            console.log(`Added product with ID: ${product._id} to cart`); // Logging for debugging
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Stack.Screen options={{
                title: product.name,
                headerRight: () => (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Link href="/Home/screen/Cart" style={{ marginRight: 40 }}>
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
                    </View>
                ),
            }} />

            {product && (
                <>
                    <Image
                        source={{ uri: `https://backend-sand-six.vercel.app/${product.image}` }}
                        style={styles.productImage}
                    />
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productPrice}>Price: {product.price} birr</Text>
                    <View style={styles.additionalInfo}>
                        <Text style={styles.productDetails}>{product.description}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title="Add to Cart" onPress={addToCart} />
                    </View>
                </>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 10,
    },
    productImage: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        marginBottom: 25,
    },
    productName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 25,
        textAlign: 'center',
        textTransform: 'capitalize',
    },
    productPrice: {
        fontSize: 20,
        color: 'green',
        textAlign: 'left',
    },
    productDetails: {
        fontSize: 17,
        textAlign: 'left',
        marginBottom: 20,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
    },
    buttonContainer: {
        marginTop: 20,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#f0f0f0',
    },
    additionalInfo: {
        marginTop: 30,
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
    },
});

export default DetailProduct;
