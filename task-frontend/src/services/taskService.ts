import axios from 'axios';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const taskService = {
  getAllTasks: async (): Promise<Task[]> => {
    try {
      const response = await axios.get<Task[]>('/api/tasks');
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  createTask: async (task: Task): Promise<Task | null> => {
    try {
      const response = await axios.post<Task>('/api/tasks', task);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export default taskService;