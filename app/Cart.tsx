// cart.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
    };

    const renderCartItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemCategory}>{item.category}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Cart</Text>
            {cartItems.length === 0 ? (
                <Text>Your cart is empty.</Text>
            ) : (
                <FlatList
                    data={cartItems}
                    renderItem={renderCartItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
            <Button title="Checkout" onPress={() => console.log('Proceed to checkout')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    cartItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemTitle: {
        fontSize: 18,
    },
    itemCategory: {
        fontSize: 14,
        color: '#666',
    },
});

export default Cart;