import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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

  const renderItem = ({ item, index }: { item: Task; index: number }) => (
      <View style={styles.taskItem}>
        <TouchableOpacity onPress={() => toggleTaskCompletion(index)} style={{ flex: 1 }}>
          <Text style={item.completed ? styles.taskTextCompleted : styles.taskText}>{item.text}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTask(index)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
  );

  return (
      <View style={styles.container}>
        <TextInput
            style={styles.input}
            onChangeText={setTask}
            value={task}
            placeholder="Add a new task"
        />
        <Button onPress={addTask} title="Add Task" color="#841584" />
        <FlatList
            data={tasks}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginHorizontal: 20,
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
});
