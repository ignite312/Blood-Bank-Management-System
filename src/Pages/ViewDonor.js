import React, { useEffect, useState } from 'react';
import '../App.css';
import '../styles.css';

function BloodBankManagement() {
  const [data, setData] = useState([]);

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
      <div>
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
  );
}

export default BloodBankManagement;
