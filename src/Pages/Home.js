import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';
import '../App.css';
import logo from '../image/spectre.jpg';

function HomePage() {
  return (
    <div className='App'>
      <div className="App-header">
        <img src={logo} className="rotating-logo" alt="logo" />
        <h1>Blood Management System</h1>

        <div className="button-container">
          <Link to="/Appointment" className="custom-button link-button">
          Appointment
          </Link>
          <Link to="/Request" className="custom-button link-button">
          Request Blood
          </Link>
          <Link to="/CreateID" className="custom-button link-button">
            Create ID
          </Link>
          <Link to="/LoginStaff" className="custom-button link-button">
          Login Staff
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
