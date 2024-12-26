import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function RemindersTab() {
  useEffect(() => {
    // Ask for permissions to receive notifications (for iOS)
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('You need to enable permissions in settings.');
      }
    };
    requestPermissions();
  }, []);

  const scheduleNotification = async () => {
    // Schedule a local notification 5 seconds from now
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Time to build your habit!',
        body: "Don't forget to log your progress today!",
      },
      trigger: {
        seconds: 5,    // Set the trigger to 5 seconds from now
        repeats: false, // Set to true if you want the notification to repeat
      },
    });
    alert('Notification scheduled for 5 seconds from now.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Reminders</Text>
      <Button title="Schedule Notification" onPress={scheduleNotification} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
  },
});
