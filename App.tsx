import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text, Alert, TouchableOpacity } from 'react-native';
import { loadTasks, saveTasks } from './util/storage';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);

  useEffect(() => {
    const initTasks = async () => {
      const loadedTasks = await loadTasks();
      setTasks(loadedTasks);
    };
    initTasks();
  }, []);

  const addTask = () => {
    if (!task.trim()) return;
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    setTask('');
    saveTasks(newTasks).then(r => console.log('added tasks', newTasks));
  };

  const deleteTask = (index: number) => {
    const newTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(newTasks);
    saveTasks(newTasks).then(r => console.log('deleted tasks', newTasks))
  };

  const renderItem = ({ item, index }: { item: string; index: number }) => (
      <View style={styles.taskItem}>
        <Text>{item}</Text>
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
  deleteButton: {
    color: 'red',
  },
});
