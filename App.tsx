import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { loadTasks, saveTasks, Task } from './util/storage';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);


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

        <View style={{justifyContent: 'center', flexDirection: 'row'}}>
          <TouchableOpacity style={styles.buttonSmall} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonSmallText}>Show Developer Info</Text>
          </TouchableOpacity>
        </View>

        {/*<Button  title="Show Developer Info" onPress={() => setModalVisible(true)} />*/}
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Developer Name: Adib Chowdhury</Text>
              <Text style={styles.modalText}>Developer Email: adibahsan@example.com</Text>
              <TouchableOpacity style={styles.buttonSmall} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonSmallText}>Hide Developer Info</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/*<Text style={styles.createdBy}>Created by Adib Chowdhury</Text>*/}
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

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  buttonSmall: {
    borderRadius: 5,
    padding: 10,
    marginBottom:10,
    backgroundColor: '#841584',
    width: 150,
    alignItems: 'center',
  },
  buttonSmallText: {
    color: 'white',
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // This will create a semi-transparent black background
  },
});
