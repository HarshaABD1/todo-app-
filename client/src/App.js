// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Import your page components
import Signup from './components/Signup';
import Login from './components/Login';
import TodoList from './components/TodoList';
import Profile from './components/Profile';
// import Navbar from './components/Navbar';

// Utility function to check if user is authenticated
const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

const App = () => {
  return (
    <Router>
      <div className="App">
        {/* <Navbar /> */}
        <Routes>
          {/* Public Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/todos"
            element={isAuthenticated() ? <TodoList /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={isAuthenticated() ? <Profile /> : <Navigate to="/login" />}
          />

          {/* Home Redirect */}
          <Route
            path="/"
            element={isAuthenticated() ? <Navigate to="/todos" /> : <Navigate to="/login" />}
          />

          {/* 404 Not Found */}
          <Route path="*" element={<h2>404 Page Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
