import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles.css'; // Import the stylesheet

function StaffLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add your authentication logic here
      // For simplicity, let's assume a successful login for any non-empty username/password
      if (username && password) {
        console.log('Login successful');
        toast.success('Login successful');

        // Redirect to the Dashboard component
        navigate('/Dashboard');
      } else {
        console.error('Invalid credentials');
        toast.error('Invalid credentials');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred during login');
    }
  };

  return (
    <div className="center-container">
      <h2>Staff Login</h2>
      <form onSubmit={handleSubmit} className="user-input-form">
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit" className="submit-button">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default StaffLogin;
