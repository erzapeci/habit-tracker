import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Goal {
  id: string;
  description: string;
  completed: boolean;
}

export default function GoalsTab() {
  const [goalDescription, setGoalDescription] = useState('');
  const [goals, setGoals] = useState<Goal[]>([]);
  const [habitGoal, setHabitGoal] = useState<string>('');

  // Load goals and habit goal from AsyncStorage
  useEffect(() => {
    const loadGoalsAndHabit = async () => {
      try {
        const storedGoals = await AsyncStorage.getItem('goals');
        const storedHabitGoal = await AsyncStorage.getItem('habitGoal');
        if (storedGoals) {
          setGoals(JSON.parse(storedGoals));
        }
        if (storedHabitGoal) {
          setHabitGoal(JSON.parse(storedHabitGoal));
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadGoalsAndHabit();
  }, []);

  // Save goals to AsyncStorage
  const saveGoals = async (updatedGoals: Goal[]) => {
    try {
      await AsyncStorage.setItem('goals', JSON.stringify(updatedGoals));
      setGoals(updatedGoals);
    } catch (error) {
      console.error('Error saving goals:', error);
    }
  };

  // Save habit goal to AsyncStorage
  const saveHabitGoal = async () => {
    try {
      await AsyncStorage.setItem('habitGoal', JSON.stringify(habitGoal));
      alert('Habit goal saved!');
    } catch (error) {
      console.error('Error saving habit goal:', error);
    }
  };

  // Add a new goal
  const addGoal = () => {
    if (!goalDescription.trim()) {
      alert('Goal description cannot be empty');
      return;
    }
    const newGoal: Goal = {
      id: Date.now().toString(),
      description: goalDescription,
      completed: false,
    };
    const updatedGoals = [...goals, newGoal];
    saveGoals(updatedGoals);
    setGoalDescription('');
  };

  // Toggle goal completion
  const toggleGoalCompletion = (goalId: string) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
    );
    saveGoals(updatedGoals);
  };

  // Delete a goal
  const deleteGoal = (goalId: string) => {
    const updatedGoals = goals.filter((goal) => goal.id !== goalId);
    saveGoals(updatedGoals);
  };

  return (
    <View style={styles.container}>
      {/* Habit Goal Section */}
      <Text style={styles.title}>Set Your Habit Goal</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 10 push-ups daily"
        value={habitGoal}
        onChangeText={setHabitGoal}
      />
      <Button title="Save Habit Goal" onPress={saveHabitGoal} />
      <Text style={styles.habitGoalText}>
        Current Habit Goal: {habitGoal || 'No goal set'}
      </Text>

      {/* Goals List Section */}
      <Text style={styles.title}>Goals</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a new goal..."
        value={goalDescription}
        onChangeText={setGoalDescription}
      />
      <Button title="Add Goal" onPress={addGoal} />

      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.goalItem}>
            <Text
              style={[
                styles.goalText,
                item.completed && { textDecorationLine: 'line-through' },
              ]}
            >
              {item.description}
            </Text>
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => toggleGoalCompletion(item.id)}
              >
                <Text style={{ color: item.completed ? 'green' : 'gray' }}>
                  {item.completed ? 'Completed' : 'Mark Done'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => deleteGoal(item.id)}
              >
                <Text style={{ color: 'red' }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
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
  habitGoalText: {
    fontSize: 16,
    marginVertical: 8,
    textAlign: 'center',
  },
  goalItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  goalText: {
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionButton: {
    padding: 8,
  },
});

