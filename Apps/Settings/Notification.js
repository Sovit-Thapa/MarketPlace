import * as Notifications from 'expo-notifications';
import { Alert, Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const requestPermissions = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    return newStatus === 'granted'; // Return the permission status
  }
  return true; // Permission already granted
};

export const checkPermissions = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  return status === 'granted'; // Return whether the permission is granted
};

export const scheduleDailyNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'New Products May Be Available!',
      body: 'Explore our store to discover the latest additions and exciting new products.',
    },
    trigger: {
      seconds: Platform.OS === 'ios' ? 61 : 6, // Short delay for testing
      repeats: true,
    },
  });
};

export const cancelAllNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};
