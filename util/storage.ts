import AsyncStorage from '@react-native-async-storage/async-storage';

// Define a task type
export type Task = {
    text: string;
    completed: boolean;
};

const TASKS_STORAGE_KEY = 'TASKS';

export const saveTasks = async (tasks: Task[]) => {
    try {
        const jsonValue = JSON.stringify(tasks);
        await AsyncStorage.setItem(TASKS_STORAGE_KEY, jsonValue);
    } catch (e) {
        console.error("Error saving tasks", e);
    }
};

export const loadTasks = async (): Promise<Task[]> => {
    try {
        const jsonValue = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch(e) {
        console.error("Error loading tasks", e);
        return [];
    }
};
