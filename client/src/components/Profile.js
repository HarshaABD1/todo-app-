import React, { Component } from 'react';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
  }

  componentDidMount() {
    this.fetchProfile();
  }

  fetchProfile = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('/api/profile', {
        headers: { Authorization: token },
      });
      if (response.ok) {
        const data = await response.json();
        this.setState({ name: data.name, email: data.email });
      } else {
        alert('Failed to fetch profile');
      }
    } catch (error) {
      alert('An error occurred while fetching profile.');
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  updateProfile = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
        }),
      });
      if (response.ok) {
        alert('Profile updated');
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      alert('An error occurred while updating profile.');
    }
  };

  render() {
    return (
      <form onSubmit={this.updateProfile}>
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
        <button type="submit">Update Profile</button>
      </form>
    );
  }
}

export default Profile;
