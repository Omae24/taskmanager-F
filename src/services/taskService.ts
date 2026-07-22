import { Task } from '../types/task';

const API_BASE_URL = 'http://localhost:8080/api/tasks';

export const getAllTasks = async (): Promise<Task[]> => {
  const res = await fetch(API_BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
};

export const getTaskById = async (id: number): Promise<Task> => {
  const res = await fetch(`${API_BASE_URL}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch task');
  return res.json();
};

export const createTask = async (task: Task): Promise<Task> => {
  const res = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Failed to create task');
  return res.json();
};

export const updateTask = async (id: number, task: Task): Promise<Task> => {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Failed to update task');
  return res.json();
};

export const deleteTask = async (id: number): Promise<void> => {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete task');
};