import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Importing icons from Ionicons

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        if (username && email && password) {
            router.push('/Home/screen/Home');
        } else {
            Alert.alert('Error', 'Please fill in all fields.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Wellcome to Awash Shop </Text>
            <Text style={styles.title}>Register</Text>

            <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                />
            </View>

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

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <View style={styles.linkContainer}>
                <Text>Already have an account? </Text>
                <Link href={'/login'} style={styles.link}>Login</Link>
            </View>
        </View>
    );
};

export default Register;

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
