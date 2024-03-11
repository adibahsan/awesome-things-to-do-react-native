import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList } from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);

  const addTask = () => {
    setTasks(currentTasks => [...currentTasks, task]);
    setTask('');
  };

  return (
      <View style={styles.container}>
        <Text>Some Tasks to do here !!!</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5a7a7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
