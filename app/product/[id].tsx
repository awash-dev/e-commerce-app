import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';

export default function ProductDetailScreen({ route }) {
    const { id } = route.params; // Get the product ID from params
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProductDetail();
    }, [id]);

    const getProductDetail = async () => {
        const URL = `http:localhost:3000/api/products/${id}`; // Use your machine's IP address
        try {
            const response = await fetch(URL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (!data) {
                throw new Error('Product not found');
            }
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
                <Text>Error: {error}</Text>
            </View>
        );
    }

    if (!product) {
        return <Text>Loading product details...</Text>; // Handling case where product is not yet loaded
    }

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: `http://<your-ip-address>:3000/img/${product.image}` }}
                style={styles.productImage}
            />
            <Text style={styles.productName}>Name: {product.name}</Text>
            <Text style={styles.productPrice}>Price: {product.price} birr</Text>
            <Text>Category: {product.category}</Text>
            <Text>Description: {product.description}</Text> {/* Assuming you have a description field */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    productImage: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    productName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    productPrice: {
        fontSize: 18,
        marginVertical: 5,
    },
});
