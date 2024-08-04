import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; 
import { requestPermissions, scheduleDailyNotification, cancelAllNotifications, checkPermissions } from './../Settings/Notification'; 

const { width, height } = Dimensions.get('window');

const scaleFontSize = (size) => (size * width) / 375; // Base width

export default function ProfileScreen() {
  const { user } = useUser();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const navigation = useNavigation(); 
  const { signOut } = useAuth();

  useEffect(() => {
    // Check notification permissions on mount
    const fetchPermissions = async () => {
      const hasPermission = await checkPermissions();
      setIsNotificationsEnabled(hasPermission);
    };

    fetchPermissions();
  }, []);

  const toggleNotifications = async () => {
    if (isNotificationsEnabled) {
      // Disable notifications
      setIsNotificationsEnabled(false);
      await cancelAllNotifications();
    } else {
      // Request permissions and enable notifications if granted
      const granted = await requestPermissions();
      if (granted) {
        setIsNotificationsEnabled(true);
        await scheduleDailyNotification();
      } else {
        Alert.alert("Permission Denied", "You need to grant notification permissions to enable notifications.");
      }
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Confirm Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "OK",
          onPress: () => signOut() 
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
    navigation.navigate('MyProductList'); 
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: user?.imageUrl }} style={styles.image} />
      <Text style={styles.username}>{user?.fullName}</Text>
      <Text style={styles.email}>{user?.primaryEmailAddress?.emailAddress}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={navigateToMyProductList}>
          <Ionicons name="file-tray-stacked" size={scaleFontSize(50)} color="white" />
          <Text style={styles.buttonText}>My Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationButton} onPress={toggleNotifications}>
          <Ionicons
            name={isNotificationsEnabled ? "checkbox-outline" : "square-outline"}
            size={scaleFontSize(24)}
            color="white"
          />
          <Text style={styles.notificationText}>Notifications</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out" size={scaleFontSize(54)} color="white" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    padding: width * 0.05, // Responsive padding
    marginTop: height * 0.05, // Responsive margin
  },
  image: {
    width: width * 0.4, // Responsive width
    height: width * 0.4, // Responsive height (square aspect ratio)
    borderRadius: width * 0.2, // Responsive border radius
    marginBottom: height * 0.02, // Responsive margin
  },
  username: {
    fontSize: scaleFontSize(30), // Responsive font size
    fontWeight: 'bold',
    marginBottom: height * 0.01, // Responsive margin
  },
  email: {
    fontSize: scaleFontSize(22), // Responsive font size
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%', 
    marginTop: height * 0.02, // Responsive margin
  },
  button: {
    flex: 1,
    height: height * 0.12, // Responsive height
    marginHorizontal: width * 0.02, // Responsive margin
    backgroundColor: '#07518b', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width * 0.05, // Responsive border radius
    flexDirection: 'row', 
  },
  buttonText: {
    color: '#fff', 
    fontSize: scaleFontSize(16), // Responsive font size
    marginLeft: width * 0.02, // Responsive margin
  },
  notificationButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.12, // Responsive height
    marginHorizontal: width * 0.02, // Responsive margin
    borderRadius: width * 0.05, // Responsive border radius
    backgroundColor: '#07518b',
  },
  notificationText: {
    fontSize: scaleFontSize(14), // Responsive font size
    color: '#fff', 
    marginLeft: width * 0.02, // Responsive margin
  },
  logoutButton: {
    width: '100%', 
    height: height * 0.12, // Responsive height
    backgroundColor: '#d03446',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width * 0.05, // Responsive border radius
    marginTop: height * 0.02, // Responsive margin
    flexDirection: 'row', 
  },
  logoutText: {
    color: '#fff', 
    fontSize: scaleFontSize(22), // Responsive font size
    marginLeft: width * 0.02, // Responsive margin
  },
});
