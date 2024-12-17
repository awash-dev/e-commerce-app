import { View, Text, Image, ActivityIndicator, StyleSheet, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';

const DetailProduct = () => {
    const { id } = useLocalSearchParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProductDetails();
    }, [id]);

    const fetchProductDetails = async () => {
        const URL = `http://localhost:3000/api/products/${id}`; // Adjust based on your API
        try {
            const response = await fetch(URL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProduct(data);
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
            <Stack.Screen  options={{ title: product.name }} />
            {product && (
                <>
                    <Image
                        source={{ uri: `http://localhost:3000/img/${product.image}` }}
                        style={styles.productImage}
                    />
                    <Text style={styles.productName}>Name: {product.name}</Text>
                    <Text style={styles.productPrice}>Price: {product.price} birr</Text>
                    <Text style={styles.productDetails}>Details: {product.description}</Text>
                    <Button title="Add to Cart" onPress={() => handleAddToCart(product._id)} />
                </>
            )}
        </View>
    );
};

const handleAddToCart = (productId) => {
    // Handle the add to cart action (e.g., update cart state, show a notification)
    console.log(`Adding product with ID: ${productId} to cart`);
    // You can implement your cart logic here
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 10,
        justifyContent: 'flex-start', // Align items to the start
    },
    productImage: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
        marginBottom: 25,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 16,
        color: 'green',
        marginBottom: 5,
    },
    productDetails: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
    },
});

export default DetailProduct;
