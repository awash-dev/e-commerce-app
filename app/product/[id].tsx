import { View, Text, Image, ActivityIndicator, StyleSheet, Button, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import '../../global.css';

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
        <ScrollView style={styles.container}>
            <Stack.Screen options={{ title: product.name }} />
            {product && (
                <>
                    <Image
                        source={{ uri: `http://localhost:3000/img/${product.image}` }}
                        style={styles.productImage}
                    />


                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productPrice}>Price {product.price} birr</Text>

                    {/* Additional Attractive Text Section */}
                    <View style={styles.additionalInfo}>
                        <Text style={styles.productDetails}>{product.description}</Text>

                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title="Add to Cart" onPress={() => handleAddToCart(product._id)} />
                    </View>
                </>
            )}
        </ScrollView>
    );
};

const handleAddToCart = (productId) => {
    console.log(`Adding product with ID: ${productId} to cart`);
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
        fontFamily:'robot',
    },
    productName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 25,
        fontFamily:'robot',
        textAlign: 'center',
        textTransform: 'capitalize',
    },
    productPrice: {
        fontSize: 20,
        fontFamily:'robot',
        color: 'green',
        textAlign: 'left',
        textTransform: 'capitalize',
    },
    productDetails: {
        fontSize: 17,
        textAlign: 'left',
        fontFamily:'robot',
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
    infoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    infoText: {
        fontSize: 16,
        marginBottom: 10,
        lineHeight: 22,
    },
});

export default DetailProduct;
