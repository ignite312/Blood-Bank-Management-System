import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ViewDonor from './ViewDonor';
import DataInput from './DonorInput';
import Dashboard from './Dashboard'; // Import your Home component
import '../styles.css';
import '../App.css';
import logo from '../image/spectre.jpg';

function HomePage() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showDefaultContent, setShowDefaultContent] = useState(true);

  const option1Content = <ViewDonor />;
  const option2Content = (
    <div>
      <h2>Option 2 Content</h2>
      <p>This is the content for Option 2.</p>
    </div>
  );
  const option3Content = (
    <div>
      <h2>Option 3 Content</h2>
      <p>This is the content for Option 3.</p>
    </div>
  );
  const option4Content = <DataInput />;

  // Handle option click
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowDefaultContent(false);
  };

  // Handle Home button click
  const handleHomeClick = () => {
    setSelectedOption(null); // Reset the selected option
    setShowDefaultContent(true);
  };

  return (
    <div>
      <div className="header-container">
        <img src={logo} className="rotating-logo" alt="logo" />
        <h1>Blood Management System</h1>
      </div>
      <div className="button-container">
        <Link to="/Dashboard" className="custom-button bigger-button link-button">
          Home
        </Link>
        <div className="options-container">
          <button
            onClick={() => handleOptionClick(option1Content)}
            className="custom-button bigger-button"
          >
            Donor/Recipient
          </button>
          <button
            onClick={() => handleOptionClick(option2Content)}
            className="custom-button bigger-button"
          >
            Appointment
          </button>
          <button
            onClick={() => handleOptionClick(option3Content)}
            className="custom-button bigger-button"
          >
            Health History
          </button>
        </div>
      </div>

      <div className="content-container">
        {/* Use Routes to render the selected option based on the route */}
        <Routes>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/" element={<>{selectedOption}</>} />
        </Routes>
      </div>
    </div>
  );
}

export default HomePage;
