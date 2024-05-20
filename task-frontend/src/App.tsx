import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const App: React.FC = () => {
  const [refreshTasks, setRefreshTasks] = useState(false);

  useEffect(() => {
    setRefreshTasks(false);
  }, [refreshTasks]);

  const handleTaskSubmit = async () => {
    const newTask = {
      id: 0,
      title: 'New Task',
      description: 'Task description',
      completed: false,
    };
    await axios.post('http://localhost:8080/api/tasks', newTask);
    setRefreshTasks(true);
  };

  const sendToKafka = (message: string) => {
    // Use HTTP POST request to send message to Kafka
    axios.post('http://localhost:8080/api/tasks', { message })
      .then(() => {
        console.log('Sent message to Kafka:', message);
      })
      .catch((error) => {
        console.error('Failed to send message to Kafka:', error);
      });
  };

  const sendToRabbitMQ = (message: string) => {
    // Use HTTP POST request to send message to RabbitMQ
    axios.post('http://localhost:8080/api/tasks', { message })
      .then(() => {
        console.log('Sent message to RabbitMQ:', message);
      })
      .catch((error) => {
        console.error('Failed to send message to RabbitMQ:', error);
      });
  };

  return (
    <div className="container d-flex flex-column align-items-start justify-content-center vh-100">
      <h1 className="text-center">Task Management App</h1> <br/><br/>
      <div className="d-flex flex-column align-items-start">
        <div className="mb-3">
          <TaskForm onSubmit={handleTaskSubmit} sendToKafka={sendToKafka} sendToRabbitMQ={sendToRabbitMQ} />
        </div>
        <div>
          <TaskList key={refreshTasks.toString()} />
        </div>
      </div>
    </div>
  );
};

export default App;
