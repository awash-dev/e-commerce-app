import React, { useState, useEffect } from 'react';
import { FlatList, Text, StyleSheet, Image, ActivityIndicator, View } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button'; // Adjust the import based on your button component
import { Card } from '@/components/ui/card'; // Adjust the import based on your card component
import { VStack } from '@/components/ui/vstack'; 
import { Box } from '@/components/ui/box'; 
import { Heading } from '@/components/ui/heading'; 

export default function HomeScreen() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/products');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log("Fetched data:", data); // Log the fetched data
                setProducts(data.products);
            } catch (error) {
                console.error("Fetch error:", error); // Log the error
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        console.log(`${product.name} added to cart!`);
    };

    const renderProduct = ({ item }) => (
        <Card style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <VStack style={styles.vStack}>
                <Heading style={styles.heading}>{item.name}</Heading>
                <Text style={styles.priceText}>${item.price.toFixed(2)}</Text> {/* Display price */}
                <Text style={styles.categoryText}>{item.category}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Box style={styles.buttonContainer}>
                    <Button style={styles.addButton} onPress={() => handleAddToCart(item)}>
                        <ButtonText style={styles.buttonText}>Add to Cart</ButtonText>
                    </Button>
                </Box>
            </VStack>
        </Card>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading products...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text>Error: {error}</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={products}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id.toString()}
            columnWrapperStyle={styles.columnWrapper}
            numColumns={2}
            ListEmptyComponent={<Text style={styles.emptyText}>No products available</Text>}
        />
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#666',
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    card: {
        padding: 5,
        borderRadius: 10,
        margin: 5,
        borderColor: "#555",
        borderWidth: 1,
        flex: 1,
    },
    image: {
        height: 120,
        width: '100%',
        borderRadius: 10,
        marginBottom: 5,
    },
    categoryText: {
        fontSize: 12,
        fontWeight: 'normal',
        color: '#333',
    },
    priceText: { // New style for price
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
    },
    vStack: {
        marginBottom: 6,
    },
    heading: {
        marginBottom: 1,
    },
    description: {
        fontSize: 14,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    addButton: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginBottom: 1,
        backgroundColor: "blue",
        borderRadius: 5,
        flex: 1,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
});
