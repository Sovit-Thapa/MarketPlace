import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; 
import { requestPermissions, scheduleDailyNotification, cancelAllNotifications } from './../Settings/Notification'; 

export default function ProfileScreen() {
  const { user } = useUser();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const navigation = useNavigation(); 
  const { signOut } = useAuth();

  useEffect(() => {
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
    alignItems: 'center', 
    padding: 20,
    marginTop: 50, 
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100, 
    marginBottom: 10, 
  },
  username: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5, 
  },
  email: {
    fontSize: 22,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%', 
    marginTop: 20, 
  },
  button: {
    flex: 1,
    height: 100, 
    marginHorizontal: 5, 
    backgroundColor: '#07518b', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    flexDirection: 'row', 
  },
  buttonText: {
    color: '#fff', 
    fontSize: 16,
    marginLeft: 10, 
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100, 
    marginHorizontal: 5, 
    borderRadius: 25,
    backgroundColor: '#07518b',
  },
  toggleText: {
    fontSize: 20,
    color: '#fff', 
    marginRight: 10,
  },
  switchTrack: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#d3d3d3', 
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
    width: '100%', 
    height: 100,
    backgroundColor: '#d03446',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 20, 
    flexDirection: 'row', 
  },
  logoutText: {
    color: '#fff', 
    fontSize: 22,
    marginLeft: 10,
  },
});
