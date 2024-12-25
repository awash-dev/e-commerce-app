import { Image, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileUpdate = ({ route, navigation }) => {
  
    // Check if userData is available
    if (!userData) {
        Alert.alert('Error', 'User data not found. Please log in again.');
        navigation.navigate('Login'); // Redirect to Login screen
        return null; // Prevent rendering the rest of the component
    }

    const [username, setUsername] = useState(userData.username);
    const [email, setEmail] = useState(userData.email);
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(userData.image);

    const handleUpdateProfile = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const userId = await AsyncStorage.getItem('userId');

            // Basic validation
            if (!username || !email) {
                Alert.alert('Error', 'Username and email are required.');
                return;
            }

            const formData = new FormData();
            formData.append('username', username);
            formData.append('email', email);
            if (password) formData.append('password', password); // Only append if password is provided
            if (image) {
                formData.append('profileImage', {
                    uri: image,
                    type: 'image/jpeg', // Adjust based on your image type
                    name: 'profile.jpg', // Change the name as required
                });
            }

            const response = await fetch(`https://backend-sand-six.vercel.app/api/users/profileUpdate/${userId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update profile');
            }

            Alert.alert('Success', 'Profile updated successfully');
            navigation.goBack(); // Go back to the previous screen
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Update Profile</Text>
            <Image
                source={{ uri: image ? `https://backend-sand-six.vercel.app/img/${image}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOuxrvcNMfGLh73uKP1QqYpKoCB0JLXiBMvA&s' }}
                style={styles.icon}
            />
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password (leave blank to not change)"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity onPress={handleUpdateProfile} style={styles.updateButton}>
                <Text style={styles.buttonText}>Update Profile</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ProfileUpdate;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    icon: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    updateButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});
