import * as Notifications from 'expo-notifications';
import { Alert, Platform } from 'react-native';
import { useEffect } from 'react';

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
    if (newStatus !== 'granted') {
      Alert.alert('Permission required', 'We need notification permissions to send you updates.');
    }
  }
};

export const scheduleDailyNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'New Products May Be Available!',
      body: 'Explore our store to discover the latest additions and exciting new products.',
    },
    trigger: {
      seconds: Platform.OS === 'ios' ? 61 : 6,
      repeats: true,
    },
  });
};

export const cancelAllNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};

export const useForegroundNotificationListener = () => {
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      Alert.alert(notification.request.content.title, notification.request.content.body);
    });

    return () => subscription.remove();
  }, []);
};
