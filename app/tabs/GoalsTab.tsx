import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GoalsTab() {
  const [goal, setGoal] = useState<string>('');

  const saveGoal = async () => {
    try {
      await AsyncStorage.setItem('habitGoal', JSON.stringify(goal));
      alert('Goal saved!');
    } catch (error) {
      console.error('Error saving goal: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Your Habit Goal</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 10 push-ups daily"
        value={goal}
        onChangeText={setGoal}
      />
      <Button title="Save Goal" onPress={saveGoal} />
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 8,
    padding: 8,
    borderRadius: 4,
  },
});

