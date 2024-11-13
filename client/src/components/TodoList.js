import React, { Component } from 'react';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTask: '',
    };
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/todo', {
        headers: { Authorization: token },
      });
      if (response.ok) {
        const data = await response.json();
        this.setState({ tasks: data });
      } else {
        alert('Failed to fetch tasks');
      }
    } catch (error) {
      alert('An error occurred while fetching tasks.');
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  addTask = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ title: this.state.newTask, status: 'pending' }),
      });
      if (response.ok) {
        this.fetchTasks();
        this.setState({ newTask: '' });
      } else {
        alert('Failed to add task');
      }
    } catch (error) {
      alert('An error occurred while adding a task.');
    }
  };

  deleteTask = async (taskId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`/api/todo/${taskId}`, {
        method: 'DELETE',
        headers: { Authorization: token },
      });
      if (response.ok) {
        this.fetchTasks();
      } else {
        alert('Failed to delete task');
      }
    } catch (error) {
      alert('An error occurred while deleting a task.');
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.addTask}>
          <input
            type="text"
            name="newTask"
            value={this.state.newTask}
            onChange={this.handleChange}
            placeholder="Add a new task"
            required
          />
          <button type="submit">Add Task</button>
        </form>
        <ul>
          {this.state.tasks.map((task) => (
            <li key={task.id}>
              {task.title} - {task.status}
              <button onClick={() => this.deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoList;
