import React, { useState, useEffect } from 'react';
import { FlatList, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { VStack } from '@/components/ui/vstack'; // Ensure VStack is imported
import { Box } from '@/components/ui/box'; // Ensure Box is imported
import { Heading } from '@/components/ui/heading'; // Ensure Heading is imported

export default function HomeScreen() {
    const [products, setProducts] = useState([]); // State for products
    const [loading, setLoading] = useState(true); // State for loading
    const [error, setError] = useState(null); // State for error

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/products'); // Use your API URL
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data.products); // Set products from API response
            } catch (error) {
                setError(error.message); // Set error message
            } finally {
                setLoading(false); // Set loading to false
            }
        };

        fetchProducts(); // Call fetch function
    }, []);

    const handleAddToCart = (product) => {
        // Implement your add to cart functionality here
        console.log(`${product.title} added to cart!`);
    };

    const renderProduct = ({ item }) => ( // Corrected destructuring here
        <Card style={styles.card}>
            <Image
                source={{ uri: item.image }} // Ensure your API returns the correct property for the image
                style={styles.image}
                accessibilityLabel="Product image"
            />
            <Text style={styles.categoryText}>{item.category}</Text>
            <VStack style={styles.vStack}>
                <Heading size="md" style={styles.heading}>
                    {item.title} {/* Ensure your API returns the correct property for the title */}
                </Heading>
                <Text style={styles.description}>
                    {item.description} {/* Ensure your API returns the correct property for the description */}
                </Text>
            </VStack>
            <Box style={styles.buttonContainer}>
                <Button style={styles.addButton} onPress={() => handleAddToCart(item)}>
                    <ButtonText style={styles.buttonText}>Add to cart</ButtonText>
                </Button>
            </Box>
        </Card>
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />; // Show loading indicator
    }

    if (error) {
        return <Text>Error: {error}</Text>; // Show error message
    }

    return (
        <FlatList
            data={products}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.container}
            numColumns={2} // Set number of columns to 2 for a grid layout
            columnWrapperStyle={styles.columnWrapper} // Optional: for spacing between columns
        />
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
    },
    columnWrapper: {
        justifyContent: 'space-between', // Adjust spacing between columns
    },
    card: {
        padding: 5,
        borderRadius: 10,
        margin: 5,
        borderColor: "#555", // Border color
        borderWidth: 1, // Set border width to 1 pixel
        flex: 1, // Allow card to take available space in the column
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
        color: '#333', // Adjust color as needed
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
        justifyContent: 'flex-start', // Align buttons to the start
    },
    addButton: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginBottom: 1,
        backgroundColor: "blue", // Set button background color
        borderRadius: 5,
        flex: 1, // Allow button to take available space
    },
    buttonText: {
        color: '#fff', // Text color for the button
        textAlign: 'center', // Center the text
    },
});