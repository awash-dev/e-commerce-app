import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, View, ActivityIndicator, StyleSheet, Pressable, Dimensions } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get screen width
    const screenWidth = Dimensions.get('window').width;

    // Determine number of columns based on screen width
    const getNumColumns = () => {
        if (screenWidth > 1200) {
            return 4; // PC view
        } else if (screenWidth > 600) {
            return 3; // Tablet view
        } else {
            return 2; // Mobile view
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const URL = 'http://localhost:3000/api/products'; // Replace with your IP address
        try {
            const response = await fetch(URL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            setError(error.message);
            console.error(error); // Log error for debugging
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
                        <Link href={`/Home/product/${item.slug || item._id}`} style={styles.link} asChild>
                            <Pressable style={styles.product}>
                                <Image
                                    source={{ uri: `http://localhost:3000/img/${item.image}` }} // Replace with your IP address
                                    style={styles.productImage}
                                />
                                <Text style={styles.productName}>Name: {item.name}</Text>
                                <Text style={styles.productPrice}>Price: {item.price} birr</Text>
                            </Pressable>
                        </Link>
                    </View>
                )}
                numColumns={getNumColumns()} // Set number of columns dynamically
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                keyExtractor={(item) => item._id} // Ensure each item has a unique key
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    productContainer: {
        flex: 1,
        margin: 5,
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        paddingTop: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    product: {
        flex: 1,
    },
    productImage: {
        width: '100%',
        height: 120,
        marginBottom: 15,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    productName: {
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 5,
        width: '100%',
    },
    productPrice: {
        textAlign: 'left',
        color: '#28a745',
        fontSize: 14,
        width: '100%',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
    },
    link: {
        width: '100%',
        padding: 10,
    },
});
