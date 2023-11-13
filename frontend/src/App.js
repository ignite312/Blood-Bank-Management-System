import logo from './image/spectre.jpg';
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]); // Initialize data state

  useEffect(() => {
    // Make an HTTP GET request to the backend API
    fetch('http://localhost:3000/api/data-from-oracle') // Replace with your API endpoint
      .then((response) => response.json())
      .then((result) => {
        // Set the retrieved data to the data state
        setData(result);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hey Welcome
        </p>
        <a
          className="App-link"
          href="https://instagram.com/sajjdemon"
          target="_blank"
          rel="noopener noreferrer"
        >
          My Instagram
        </a>
        <div>
          <h1>Blood Bank Management System</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Blood Type</th>
                <th>Location</th>
                <th>Email</th>
                <th>Donation Count</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </header>
    </div>
  );
}

export default App;