import React, { useEffect, useState } from 'react';
import '../App.css';
import '../styles.css';

function UserDataInput({ onUserInput }) {
    const [userData, setUserData] = useState({
        person_id: '',
        full_name: '',
        age: '',
        gender: '',
        address: '',
        blood_group: '',
        phone_number: '',
        email: '',
        is_public_donor: '',
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
                    person_id: '',
                    full_name: '',
                    age: '',
                    gender: '',
                    address: '',
                    blood_group: '',
                    phone_number: '',
                    email: '',
                    is_public_donor: '',
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
        <div className="center-container">
            <h2>Donor/Patient Information</h2>
            <form onSubmit={handleSubmit} className="user-input-form" onKeyDown={handleKeyDown}>
                <div>
                    <label htmlFor="person_id">ID:</label>
                    <input
                        type="text"
                        id="person_id"
                        name="person_id"
                        value={userData.person_id}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="full_name">Full Name:</label>
                    <input
                        type="text"
                        id="full_name"
                        name="full_name"
                        value={userData.full_name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="age">Age:</label>
                    <input
                        type="text"
                        id="age"
                        name="age"
                        value={userData.age}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="gender">Gender:</label>
                    <select
                        id="gender"
                        name="gender"
                        value={userData.gender}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={userData.address}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="blood_group">Blood Group:</label>
                    <select
                        id="blood_group"
                        name="blood_group"
                        value={userData.blood_group}
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
                    <label htmlFor="phone_number">Phone Number:</label>
                    <input
                        type="text"
                        id="phone_number"
                        name="phone_number"
                        value={userData.phone_number}
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
                    <label>Is Public Donor:</label>
                    <div>
                        <input
                            type="checkbox"
                            id="is_public_donor"
                            name="is_public_donor"
                            checked={userData.is_public_donor === 'Y'}
                            onChange={(e) => {
                                setUserData((prevUserData) => ({
                                    ...prevUserData,
                                    is_public_donor: e.target.checked ? 'Y' : 'N',
                                }));
                            }}
                        />
                        <label htmlFor="is_public_donor_yes">Yes</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="is_public_donor_no"
                            name="is_public_donor_no"
                            checked={userData.is_public_donor === 'N'}
                            onChange={(e) => {
                                setUserData((prevUserData) => ({
                                    ...prevUserData,
                                    is_public_donor: e.target.checked ? 'N' : 'Y',
                                }));
                            }}
                        />
                        <label htmlFor="is_public_donor_no">No</label>
                    </div>
                </div>

                <div>
                    <button type="submit" className="submit-button">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default UserDataInput;
