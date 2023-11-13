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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUserInput(userData);
  };

  return (
    <div>
      <h2>Donor Information</h2>
      <form onSubmit={handleSubmit} className="user-input-form">
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



