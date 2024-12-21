import { Image, StyleSheet, Text, View, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, router } from 'expo-router';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken'); // Retrieve the token from AsyncStorage
        if (!token) {
          Alert.alert('Error', 'No authentication token found.');
          return;
        }

        const response = await fetch('http://localhost:3000/api/users/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken'); // Clear the token
      Alert.alert('Success', 'You have logged out successfully.');
      router.push('/login');
    } catch (error) {
      Alert.alert('Error', 'Failed to log out.');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No user data found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Image
          source={{
            uri: userData.profilePicture || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOuxrvcNMfGLh73uKP1QqYpKoCB0JLXiBMvA&s'
          }}
          style={styles.icon}
        />
        <Text style={styles.text}>Name: {userData.username}</Text>
        <Text style={styles.text}>Email: {userData.email}</Text>
        <View style={styles.buttonContainer}>
          <Link href={{ pathname: '/Home/profileupdate/ProfileUpdate', params: { userData } }}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editLink}>Edit</Text>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#f4f4f4', // Light background
  },
  title: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
  },
  info: {
    alignItems: 'center',
    height: 400,
    justifyContent: 'center',
    padding: 20,
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000', // Add shadow for depth
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // For Android shadow
    gap: 20,
    width: '100%',
  },
  icon: {
    width: 150,
    height: 150,
    borderRadius: 75, // Make the image circular
    borderWidth: 2,
    borderColor: '#007BFF', // Border color for the image
  },
  text: {
    fontSize: 16,
    color: '#333', // Darker text color
    textAlign: 'left',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 15,
    padding: 10,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    elevation: 2,
  },
  editLink: {
    color: '#fff',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
    elevation: 2,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
  },
});
