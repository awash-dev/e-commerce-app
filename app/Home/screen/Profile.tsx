import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.info}>
        <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOuxrvcNMfGLh73uKP1QqYpKoCB0JLXiBMvA&s' }} style={styles.icon} />
        <Text style={styles.text}>Name: John Doe</Text>
        <Text style={styles.text}>Email: johndoe@example.com</Text>
      </View>
    </View >
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    textTransform: 'capitalize',
    justifyContent: 'center',
    width: '90%', // Added to make the container 90% width
    alignSelf: 'center', // Added to center the container
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
    padding: 10,
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    gap: 40,
    width: '100%', // Added to make the info container full width
  },
  icon: {
    width: 150,
    height: 150,
    borderRadius: 20,
  },
  text: {
    fontSize: 16,
    color: '#000',
  }
})
