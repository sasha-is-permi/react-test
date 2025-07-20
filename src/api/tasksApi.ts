import { Task } from '../types/task';

const LOCAL_STORAGE_KEY = 'tasks';

function getLocalTasks(): Task[] {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : [
    { id: '1', text: 'Почитать документацию React', completed: false },
    { id: '2', text: 'Сделать тестовое задание', completed: true },
    { id: '3', text: 'Выпить кофе', completed: false },
  ];
}

function setLocalTasks(tasks: Task[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
}

let tasks = getLocalTasks();

function delay<T>(result: T, ms = 700): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(result), ms));
}

export const tasksApi = {
  async getTasks(): Promise<Task[]> {
    return delay([...tasks]);
  },
  async createTask(text: string): Promise<Task> {
    const newTask: Task = { id: Date.now().toString(), text, completed: false };
    tasks = [newTask, ...tasks];
    setLocalTasks(tasks);
    return delay(newTask);
  },
  async updateTask(id: string, updates: Partial<Omit<Task, 'id'>>): Promise<Task> {
    tasks = tasks.map(t => t.id === id ? { ...t, ...updates } : t);
    setLocalTasks(tasks);
    const updated = tasks.find(t => t.id === id)!;
    return delay(updated);
  },
  async deleteTask(id: string): Promise<void> {
    tasks = tasks.filter(t => t.id !== id);
    setLocalTasks(tasks);
    return delay(undefined);
  }
};