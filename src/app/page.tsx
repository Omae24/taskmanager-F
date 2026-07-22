'use client';

import { useEffect, useState } from 'react';
import { Task } from '../types/task';
import * as taskService from '../services/taskService';
import TaskForm from '../components/TaskForm';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTasks = async () => {
    try {
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateOrUpdate = async (task: Task) => {
    if (task.id) {
      await taskService.updateTask(task.id, task);
      setEditingTask(null);
    } else {
      await taskService.createTask(task);
    }
    fetchTasks();
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this task?')) {
      await taskService.deleteTask(id);
      fetchTasks();
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Task Management Application
        </h1>

        <TaskForm
          onSubmit={handleCreateOrUpdate}
          initialTask={editingTask}
          onCancel={() => setEditingTask(null)}
        />

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Task List</h2>
          {loading ? (
            <p className="text-gray-500">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="text-gray-500">No tasks found. Add one above!</p>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="border border-gray-200 rounded-lg p-4 flex justify-between items-start hover:shadow-sm transition"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${getStatusBadge(
                          task.status
                        )}`}
                      >
                        {task.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-gray-600">{task.description}</p>
                    <p className="text-sm text-gray-400">Due: {task.dueDate}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingTask(task)}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => task.id && handleDelete(task.id)}
                      className="text-red-600 hover:text-red-800 font-medium text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}