import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { requestPermissions, scheduleDailyNotification, cancelAllNotifications } from './../Settings/Notification'; // Import functions from notification.js

export default function ProfileScreen() {
  const { user } = useUser();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const navigation = useNavigation(); // Initialize useNavigation
  const { signOut } = useAuth();

  useEffect(() => {
    // Optionally, you could check notification permissions on component mount
  }, []);

  const toggleSwitch = async () => {
    const newState = !isNotificationsEnabled;
    setIsNotificationsEnabled(newState);

    if (newState) {
      await requestPermissions();
      await scheduleDailyNotification();
    } else {
      await cancelAllNotifications();
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Confirm Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "OK",
          onPress: () => signOut() // Proceed with sign out if confirmed
        },
        {
          text: "Cancel",
          style: "cancel"
        },
      ],
      { cancelable: false }
    );
  };

  const navigateToMyProductList = () => {
    navigation.navigate('MyProductList'); // Navigate to MyProductListScreen
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: user?.imageUrl }} style={styles.image} />
      <Text style={styles.username}>{user?.fullName}</Text>
      <Text style={styles.email}>{user?.primaryEmailAddress?.emailAddress}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={navigateToMyProductList}>
          <Ionicons name="file-tray-stacked" size={50} color="white" />
          <Text style={styles.buttonText}>My Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton} onPress={toggleSwitch}>
          <View style={[
            styles.switchTrack,
            { backgroundColor: isNotificationsEnabled ? '#efae4d' : '#d3d3d3' }
          ]}>
            <View style={[
              styles.switchThumb,
              { backgroundColor: '#fff', transform: [{ translateX: isNotificationsEnabled ? 30 : 0 }] }
            ]} />
          </View>
          <Text style={styles.toggleText}>Notifications</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out" size={54} color="white" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // Centers content horizontally
    padding: 20,
    marginTop: 50, // Space from the top
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100, // Makes the image round
    marginBottom: 10, // Space between image and username
  },
  username: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5, // Space between username and email
  },
  email: {
    fontSize: 22,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%', // Full width of the container
    marginTop: 20, // Space above the button and toggle
  },
  button: {
    flex: 1,
    height: 100, // Equal height for button
    marginHorizontal: 5, // Space between button and toggle
    backgroundColor: '#07518b', // Same color as toggle
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25, // Rounded corners
    flexDirection: 'row', // Align icon and text horizontally
  },
  buttonText: {
    color: '#fff', // Button text color
    fontSize: 16,
    marginLeft: 10, // Space between icon and text
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100, // Same height as button
    marginHorizontal: 5, // Space between button and toggle
    borderRadius: 25, // Rounded corners
    backgroundColor: '#07518b', // Same color as button
  },
  toggleText: {
    fontSize: 20,
    color: '#fff', // Match the color of the button and switch
    marginRight: 10,
  },
  switchTrack: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#d3d3d3', // Default track color
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginRight: 10,
  },
  switchThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    top: 5,
    left: 5,
  },
  logoutButton: {
    width: '100%', // Full width of the container
    height: 100,
    backgroundColor: '#d03446', // Color for logout button
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 20, // Space above the logout button
    flexDirection: 'row', // Align icon and text horizontally
  },
  logoutText: {
    color: '#fff', // Text color for logout button
    fontSize: 22,
    marginLeft: 10, // Space between icon and text
  },
});
