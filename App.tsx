import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { loadTasks, saveTasks, Task } from './util/storage';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const initTasks = async () => {
      const loadedTasks = await loadTasks();
      setTasks(loadedTasks);
    };
    initTasks();
  }, []);

  const addTask = () => {
    if (!task.trim()) return;
    const newTasks = [...tasks, { text: task, completed: false }];
    setTasks(newTasks);
    setTask('');
    saveTasks(newTasks);
  };

  const deleteTask = (index: number) => {
    const newTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const toggleTaskCompletion = (index: number) => {
    const newTasks = tasks.map((t, i) => i === index ? { ...t, completed: !t.completed } : t);
    setTasks(newTasks);
    saveTasks(newTasks);
    if (newTasks[index].completed) {
      Alert.alert("Task Completed", `"${newTasks[index].text}" is now marked as completed.`);
    }
  };

  return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>My Awesome ToDo List</Text>
        <View style={styles.taskContainer}>
          <TextInput
              style={styles.input}
              onChangeText={setTask}
              value={task}
              placeholder="Add a new task"
          />
          <Button onPress={addTask} title="Add Task" color="#841584" />
          <FlatList
              data={tasks}
              renderItem={({ item, index }) => (
                  <View style={styles.taskItem}>
                    <TouchableOpacity onPress={() => toggleTaskCompletion(index)} style={{ flex: 1 }}>
                      <Text style={item.completed ? styles.taskTextCompleted : styles.taskText}>{item.text}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteTask(index)}>
                      <Text style={styles.deleteButton}>Delete</Text>
                    </TouchableOpacity>
                  </View>
              )}
              keyExtractor={(_, index) => index.toString()}
          />
        </View>
        <Text style={styles.createdBy}>Created by Adib Chowdhury</Text>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  taskContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginVertical: 5,
    backgroundColor: '#f9c2ff',
    borderRadius: 5,
  },
  taskText: {
    textDecorationLine: 'none',
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
  },
  deleteButton: {
    color: 'red',
  },
  createdBy: {
    textAlign: 'center',
    marginVertical: 10,
  },
});
