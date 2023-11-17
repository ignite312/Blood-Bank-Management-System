import React, { useEffect, useState } from 'react';
import '../App.css';
import '../styles.css';

function UserDataInput({ onUserInput }) {
  const [userData, setUserData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    phone: '',
    bloodType: '',
    location: '',
    email: '',
    donationCount: '',
  });
  const [loading, setLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch('http://localhost:3000/api/insert-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log('Data successfully inserted into the database');
        setSubmissionStatus('success');
        // Optionally, reset the form or provide feedback to the user
        setUserData({
          id: '',
          firstName: '',
          lastName: '',
          phone: '',
          bloodType: '',
          location: '',
          email: '',
          donationCount: '',
        });
        onUserInput(userData);
      } else {
        console.error('Failed to insert data into the database');
        setSubmissionStatus('failure');
        // Optionally, provide user-friendly error message or feedback
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmissionStatus('failure');
      // Optionally, provide user-friendly error message or feedback
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    const activeElement = document.activeElement;
    const inputFields = Array.from(document.getElementsByTagName('input'));
    const currentIndex = inputFields.indexOf(activeElement);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % inputFields.length;
      inputFields[nextIndex].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + inputFields.length) % inputFields.length;
      inputFields[prevIndex].focus();
    }
  };

  return (
    <div>
      <h2>Donor Information</h2>
      <form onSubmit={handleSubmit} className="user-input-form" onKeyDown={handleKeyDown}>
        <div>
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={userData.id}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={userData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={userData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="bloodType">Blood Type:</label>
          <input
            type="text"
            id="bloodType"
            name="bloodType"
            value={userData.bloodType}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={userData.location}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="donationCount">Donation Count:</label>
          <input
            type="text"
            id="donationCount"
            name="donationCount"
            value={userData.donationCount}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit" className="submit-button">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default UserDataInput;
