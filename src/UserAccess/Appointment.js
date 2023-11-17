import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AppointmentForm({ onFormSubmit }) {
  const [donorId, setDonorId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setDonorId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch('http://localhost:3000/api/create-appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          donor_id: donorId,
        }),
      });

      if (response.ok) {
        console.log('Appointment data successfully inserted into the database');
        // Display toast message for success
        toast.success('Appointment data successfully inserted into the database');
        // Optionally, reset the form or provide feedback to the user
        setDonorId('');
        onFormSubmit();
      } else {
        console.error('Failed to insert appointment data into the database');
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
    <div>
      <h2>Appointment Information</h2>
      <form onSubmit={handleSubmit} className="user-input-form">
        <div>
          <label htmlFor="donor_id">Donor ID:</label>
          <input
            type="text"
            id="donor_id"
            name="donor_id"
            value={donorId}
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

export default AppointmentForm;
