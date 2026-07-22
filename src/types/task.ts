export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export interface Task {
  id?: number;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string; // ISO format string: YYYY-MM-DD
}
