import React, { useState, useEffect } from 'react';
import '../App.css';
import '../styles.css';


function RequestForm({ onFormSubmit }) {
  const [requestData, setRequestData] = useState({
    patient_id: '',
    quantity: 1,
    blood_group: '',
    hospital_name: '',
  });

  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Fetch and set the list of patients
    const fetchPatients = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/get-patients');
        if (response.ok) {
          const data = await response.json();
          setPatients(data.patients);
        } else {
          console.error('Failed to fetch patients');
        }
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRequestData((prevRequestData) => ({
      ...prevRequestData,
      [name]: value,
    }));
  };

  const handleQuantityChange = (amount) => {
    setRequestData((prevRequestData) => ({
      ...prevRequestData,
      quantity: Math.max(1, prevRequestData.quantity + amount),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch('http://localhost:3000/api/insert-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...requestData,
          request_date: new Date().toISOString().split('T')[0],
        }),
      });

      if (response.ok) {
        console.log('Request data successfully inserted into the database');
        // Optionally, reset the form or provide feedback to the user
        setRequestData({
          patient_id: '',
          quantity: 1,
          blood_group: '',
          hospital_name: '',
        });
        onFormSubmit(requestData);
      } else {
        console.error('Failed to insert request data into the database');
        // Optionally, provide user-friendly error message or feedback
      }
    } catch (error) {
      console.error('Error:', error);
      // Optionally, provide user-friendly error message or feedback
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center-container">
      <h2>Request Blood</h2>
      <form onSubmit={handleSubmit} className="user-input-form">
        <div>
          <label htmlFor="patient_id">Patient ID:</label>
          <input
            type="text"
            id="patient_id"
            name="patient_id"
            value={requestData.patient_id}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <div className="quantity-input">
            <button type="button" onClick={() => handleQuantityChange(-1)}>
              -
            </button>
            <span>{requestData.quantity}</span>
            <button type="button" onClick={() => handleQuantityChange(1)}>
              +
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="blood_group">Blood Group:</label>
          <select
            id="blood_group"
            name="blood_group"
            value={requestData.blood_group}
            onChange={handleInputChange}
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
        <div>
          <label htmlFor="hospital_name">Hospital Name:</label>
          <input
            type="text"
            id="hospital_name"
            name="hospital_name"
            value={requestData.hospital_name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default RequestForm;
