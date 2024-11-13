import React, { Component } from 'react';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSignup = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
        }),
      });
      if (response.ok) {
        alert('Signup successful');
        // Redirect to login page
      } else {
        const data = await response.json();
        alert(data.message || 'Error signing up');
      }
    } catch (error) {
      alert('An error occurred during signup.');
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSignup}>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Signup</button>
      </form>
    );
  }
}

export default Signup;
