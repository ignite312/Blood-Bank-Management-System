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
          <Link to="/Dashboard" className="custom-button link-button">
            View Information
          </Link>
          <Link to="/DataInput" className="custom-button link-button">
            Data Input
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
