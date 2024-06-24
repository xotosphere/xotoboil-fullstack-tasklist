import React, { useState } from 'react';
import axios from 'axios';

interface TaskFormProps {
  onSubmit: () => void;
  sendToKafka: (message: string) => void;
  sendToRabbitMQ: (message: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, sendToKafka, sendToRabbitMQ }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !description) {
      setError('Please enter both title and description.');
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/tasks', { title, description, completed: false });
      setTitle('');
      setDescription('');
      setError('');
      onSubmit();
      sendToKafka(`New task created: ${title}`);
      sendToRabbitMQ(`New task created: ${title}`);
    } catch (error) {
      setError('An error occurred while creating the task.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Task</h3>
      {error && <p className="text-danger">{error}</p>}
      <div>
        <label htmlFor="title">Title</label>
        <br />
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <br />
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default TaskForm;
