import React from 'react';
import { FlatList, Text, View, StyleSheet } from "react-native";
import productsData from '../assets/product.json'; 
import ProductListItems from '../components/ProductListItems';

import "../global.css"

export default function HomeScreen() {
    const products = productsData.products; 

    return (
        <View >
            <FlatList
                data={products}
                renderItem={({ item }) => <ProductListItems product={item} />}
                keyExtractor={(item) => item.id.toString()} // Ensure each item has a unique key
            />
        </View>
    );
}
