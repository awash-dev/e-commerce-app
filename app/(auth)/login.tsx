import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        if (email && password) {
            setLoading(true);
            try {
                const response = await fetch('https://backend-sand-six.vercel.app/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    await AsyncStorage.setItem('userToken', data.token);
                    Alert.alert('Success', 'Login successful!');
                    router.push('/Home/screen/Home');
                } else {
                    Alert.alert('Error', data.message || 'Login failed.');
                }
            } catch (error) {
                Alert.alert('Error', 'Something went wrong. Please try again.');
            } finally {
                setLoading(false);
            }
        } else {
            Alert.alert('Error', 'Please fill in both fields.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome Back to Awash Shop</Text>
            <Text style={styles.title}>Login</Text>

            <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>

            <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Login</Text>
                )}
            </TouchableOpacity>

            <View style={styles.linkContainer}>
                <Text>Don't have an account? </Text>
                <Link href={'/register'} style={styles.link}>Register</Link>
            </View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: 'Arial',
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    icon: {
        marginRight: 10,
        color: '#007BFF',
    },
    input: {
        flex: 1,
        padding: 10,
        fontFamily: 'Arial',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Arial',
    },
    linkContainer: {
        flexDirection: 'row',
        marginTop: 15,
        alignItems: 'center',
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
});
