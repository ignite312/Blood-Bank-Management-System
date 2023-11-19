-- Insert data into Person table
INSERT INTO Person (person_id, full_name, age, gender, address, blood_group, phone_number, email, is_public_donor)
VALUES (1, 'Emon Khan', 21, 'Male', 'Mymensingh', 'O+', '1234567890', 'emon.khan@email.com', 'Y');

INSERT INTO Person (person_id, full_name, age, gender, address, blood_group, phone_number, email, is_public_donor)
VALUES (2, 'Rakin Afsar', 16, 'Male', 'Mymensingh', 'A+', '9876543210', 'rakin.afser@email.com', 'N');

INSERT INTO Person (person_id, full_name, age, gender, address, blood_group, phone_number, email, is_public_donor)
VALUES (3, 'Tousif Khan', 9, 'Male', 'Mymensingh', 'O+', '5551112222', 'tousif.khan@email.com', 'Y');

INSERT INTO Person (person_id, full_name, age, gender, address, blood_group, phone_number, email, is_public_donor)
VALUES (4, 'Zayan Hosain', 5, 'Male', 'Mymensingh', 'AB-', '9998887777', 'zayan.hosain@email.com', 'N');

INSERT INTO Person (person_id, full_name, age, gender, address, blood_group, phone_number, email, is_public_donor)
VALUES (5, 'Nasif Khan', 8, 'Male', 'Mymensingh', 'A+', '4443332222', 'nasif.khan@email.com', 'Y');

INSERT INTO Person (person_id, full_name, age, gender, address, blood_group, phone_number, email, is_public_donor)
VALUES (6, 'Iqra Islam', 5, 'Female', 'Dhaka', 'AB+', '51552525', 'iqra.Hosain@email.com', 'Y');


-- Insert data into HealthHistory table
INSERT INTO HealthHistory (checkup_id, person_id, checkup_date, medical_condition)
VALUES (1, 1, TO_DATE('2023-01-01', 'YYYY-MM-DD'), 'Normal Checkup');

INSERT INTO HealthHistory (checkup_id, person_id, checkup_date, medical_condition)
VALUES (2, 2, TO_DATE('2023-02-15', 'YYYY-MM-DD'), 'Flu');

INSERT INTO HealthHistory (checkup_id, person_id, checkup_date, medical_condition)
VALUES (3, 3, TO_DATE('2023-03-20', 'YYYY-MM-DD'), 'Allergies');

INSERT INTO HealthHistory (checkup_id, person_id, checkup_date, medical_condition)
VALUES (4, 1, TO_DATE('2023-04-10', 'YYYY-MM-DD'), 'Pediatric Checkup');

INSERT INTO HealthHistory (checkup_id, person_id, checkup_date, medical_condition)
VALUES (5, 2, TO_DATE('2023-05-05', 'YYYY-MM-DD'), 'Eye Exam');

-- Insert data into Appointment table
INSERT INTO Appointment (appointment_id, donor_id, appointment_date, status)
VALUES (111, 1, TO_DATE('2023-01-01', 'YYYY-MM-DD'), 'Pending');

INSERT INTO Appointment (appointment_id, donor_id, appointment_date, status)
VALUES (222, 2, TO_DATE('2023-01-01', 'YYYY-MM-DD'), 'Pending');

INSERT INTO Appointment (appointment_id, donor_id, appointment_date, status)
VALUES (333, 3, TO_DATE('2023-01-01', 'YYYY-MM-DD'), 'Pending');

INSERT INTO Appointment (appointment_id, donor_id, appointment_date, status)
VALUES (444, 4, TO_DATE('2023-01-01', 'YYYY-MM-DD'), 'Pending');

INSERT INTO Appointment (appointment_id, donor_id, appointment_date, status)
VALUES (555, 5, TO_DATE('2023-01-01', 'YYYY-MM-DD'), 'Pending');


-- Insert data into Donation table
INSERT INTO Donation (donation_id, appointment_id, donor_id, donation_date, quantity, blood_group)
VALUES (69, 111, 1, TO_DATE('2023-01-02', 'YYYY-MM-DD'), 3, 'O+');

INSERT INTO Donation (donation_id, appointment_id, donor_id, donation_date, quantity, blood_group)
VALUES (79, 222, 2, TO_DATE('2023-01-02', 'YYYY-MM-DD'), 2, 'A+');


-- Insert data into Inventory table
INSERT INTO Inventory (inventory_id, donation_id, blood_group, quantity, status, collection_date, expiry_date, location)
VALUES (1000, 69, 'O+', 3, 'Available', TO_DATE('2023-01-02', 'YYYY-MM-DD'), TO_DATE('2023-01-05', 'YYYY-MM-DD'), 'Hospital A');

INSERT INTO Inventory (inventory_id, donation_id, blood_group, quantity, status, collection_date, expiry_date, location)
VALUES (2000, 79, 'A+', 2, 'Available', TO_DATE('2023-01-02', 'YYYY-MM-DD'), TO_DATE('2023-01-04', 'YYYY-MM-DD'), 'Hospital B');


-- Insert data into Request table
INSERT INTO Request (request_id, patient_id, request_date, quantity, status, blood_group, hospital_name) 
VALUES (534, 3, TO_DATE('2023-01-02', 'YYYY-MM-DD'), 4, 'Pending', 'O+', 'MMC');

INSERT INTO Request (request_id, patient_id, request_date, quantity, status, blood_group, hospital_name) 
VALUES (383, 4, TO_DATE('2023-01-02', 'YYYY-MM-DD'), 2, 'Pending', 'AB-', 'CMH');

INSERT INTO Request (request_id, patient_id, request_date, quantity, status, blood_group, hospital_name) 
VALUES (414, 5, TO_DATE('2023-01-02', 'YYYY-MM-DD'), 2, 'Pending', 'A+', 'MMC');

INSERT INTO Request (request_id, patient_id, request_date, quantity, status, blood_group, hospital_name) 
VALUES (876, 1, TO_DATE('2023-01-02', 'YYYY-MM-DD'), 4, 'Pending', 'O+', 'MMC');

INSERT INTO Request (request_id, patient_id, request_date, quantity, status, blood_group, hospital_name) 
VALUES (256, 2, TO_DATE('2023-01-02', 'YYYY-MM-DD'), 2, 'Pending', 'A+', 'CMH');

INSERT INTO Request (request_id, patient_id, request_date, quantity, status, blood_group, hospital_name) 
VALUES (543, 3, TO_DATE('2023-01-02', 'YYYY-MM-DD'), 2, 'Pending', 'O+', 'MMC');


-- Insert data into Receive table
INSERT INTO Receive (receive_id, request_id, inventory_id, receive_date, quantity, total_cost) 
VALUES (91, 534, 1000, TO_DATE('2023-01-02', 'YYYY-MM-DD'), 2, 1000);

INSERT INTO Receive (receive_id, request_id, inventory_id, receive_date, quantity, total_cost) 
VALUES (92, 414, 2000, TO_DATE('2023-01-02', 'YYYY-MM-DD'), 2, 5000);