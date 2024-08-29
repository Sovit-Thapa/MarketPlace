import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; 
import { requestPermissions, scheduleDailyNotification, cancelAllNotifications, checkPermissions } from './../Settings/Notification'; 
import { styles, scaleFontSize } from './Styles/ProfileScreenStyles';

export default function ProfileScreen() {
  const { user } = useUser();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const navigation = useNavigation(); 
  const { signOut } = useAuth();

  useEffect(() => {
    const fetchPermissions = async () => {
      const hasPermission = await checkPermissions();
      setIsNotificationsEnabled(hasPermission);
    };

    fetchPermissions();
  }, []);

  const toggleNotifications = async () => {
    if (isNotificationsEnabled) {
      setIsNotificationsEnabled(false);
      await cancelAllNotifications();
    } else {
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

