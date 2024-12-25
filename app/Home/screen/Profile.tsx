import { Image, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        console.log('Token:', token); // Log the token to check if it's valid
        if (token) {
          const response = await fetch('https://backend-sand-six.vercel.app/api/users/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          console.log('Fetched user data:', data); // Log the fetched data
          setUserData(data);
        } else {
          console.error('No token found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    router.push('/login');
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#007BFF" />;
  }

  console.log('User Data State:', userData);

  if (!userData || Object.keys(userData).length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No user data available.</Text>
      </View>
    );
  }

  const imageUrl = userData.profileImage
    ? `https://backend-iota-flame.vercel.app/img/${userData.profileImage}`
    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOuxrvcNMfGLh73uKP1QqYpKoCB0JLXiBMvA&s';

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.icon}
        />
        <Text style={styles.text}>Username: {userData.username}</Text>
        <Text style={styles.text}>Email: {userData.email}</Text>
        <Text style={styles.text}>Password: {userData.password}</Text>

        <View style={styles.buttonContainer}>
          <Link href="/Home/profileupdate/ProfileUpdate">
            <View style={styles.editButton}>
              <Text style={styles.editLink}>Update Profile</Text>
            </View>
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
    backgroundColor: '#f4f4f4',
  },
  info: {
    alignItems: 'center',
    height: 400,
    justifyContent: 'center',
    padding: 20,
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    gap: 20,
    width: '100%',
  },
  icon: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#007BFF',
  },
  text: {
    fontSize: 16,
    color: '#333',
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
    color: '#fff',
    borderRadius: 5,
    elevation: 2,
    fontFamily: "sans-serif",
  },
  logoutButton: {
    backgroundColor: '#FF4D4D',
    padding: 10,
    borderRadius: 5,
    elevation: 2,
    color: '#fff',
  },
  editLink: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
