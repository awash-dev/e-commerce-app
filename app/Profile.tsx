import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router"; // Import Link for navigation
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure this library is installed
import { useNavigation } from '@react-navigation/native'; // Import useNavigation for navigation
import { Button } from "@/components/ui/button";


export default function ProfileScreen() {
    const navigation = useNavigation(); // Get the navigation object
    const [userData, setUserData] = useState({ username: "", email: "", password: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/users");
                const data = await response.json();
                setUserData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <Text style={styles.loadingText}>Loading...</Text>;
    }

    if (error) {
        return <Text style={styles.errorText}>Error: {error}</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile Screen</Text>

            <View style={styles.infoContainer}>
                <Text style={styles.label}>Username: </Text>
                <Text style={styles.value}>{userData.username}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Email: </Text>
                <Text style={styles.value}>{userData.email}</Text>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.label}>Password: </Text>
                <Text style={styles.value}>{userData.password}</Text>
            </View>

            <Button style={styles.link}>
                <Text style={styles.linkText}>Update Info</Text>
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap:20,
        justifyContent: 'flex-start', // Align items at the start
        backgroundColor: '#f9f9f9', // Light background color
    },
    title: {
        fontSize: 30,
        marginTop:20,
        marginBottom: 20,
        fontWeight: 'bold', // Bold title
        color: '#333', // Darker text color
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#fff', // White background for info containers
        borderRadius: 8, // Rounded corners
        shadowColor: '#000', // Shadow for elevation
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2, // Elevation for Android
    },
    label: {
        flex: 1,
        fontSize: 18,
        fontWeight: '600', // Semi-bold label
        color: '#555', // Medium gray color
    },
    value: {
        flex: 2,
        fontSize: 18,
        color: '#000', // Black color for value
    },
    loadingText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#888', // Gray color for loading text
    },
    errorText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'red', // Red color for error text
    },
    link: {
        flex: 1,
        marginBottom: 15,
        padding: 1,
        marginTop: 50,
    },
    linkText: {
        padding: 10,
        textAlign:'center',
        borderRadius:10,
        fontSize: 18,
        backgroundColor: '#007BFF',
        color: '#fff'
    },
});
