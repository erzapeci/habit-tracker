import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StreaksTab() {
  const [streakCount, setStreakCount] = useState<number>(0);

  useEffect(() => {
    // Example: fetch streak data from AsyncStorage
    const fetchStreakData = async () => {
      try {
        const storedStreak = await AsyncStorage.getItem('streakCount');
        if (storedStreak) {
          setStreakCount(JSON.parse(storedStreak));
        }
      } catch (error) {
        console.error('Error fetching streak data: ', error);
      }
    };

    fetchStreakData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Streaks</Text>
      <Text style={styles.text}>
        Current Streak: {streakCount} day{streakCount !== 1 ? 's' : ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
  },
});

