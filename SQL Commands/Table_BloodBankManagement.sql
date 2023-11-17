CREATE TABLE Person (
  person_id NUMBER PRIMARY KEY,
  full_name VARCHAR2(50) NOT NULL,
  age NUMBER NOT NULL,
  gender VARCHAR2(10) NOT NULL,
  address VARCHAR2(100),
  blood_group VARCHAR2(10),
  phone_number VARCHAR2(15) NOT NULL,
  email VARCHAR2(100),
  is_public_donor CHAR(1) CHECK (is_public_donor IN ('Y', 'N'))
);

CREATE TABLE HealthHistory (
  checkup_id NUMBER PRIMARY KEY,
  person_id NUMBER,
  checkup_date DATE,
  medical_condition VARCHAR2(255),
  FOREIGN KEY (person_id) REFERENCES Person(person_id)
);

CREATE TABLE Appointment (
  appointment_id NUMBER PRIMARY KEY,
  donor_id NUMBER,
  appointment_date DATE,
  status VARCHAR2(15), -- Pending/Donated
  FOREIGN KEY (donor_id) REFERENCES Person(person_id)
);

CREATE TABLE Donation (
  donation_id NUMBER PRIMARY KEY,
  donor_id NUMBER,
  donation_date DATE,
  quantity NUMBER,
  blood_group VARCHAR2(10),
  FOREIGN KEY (donation_id) REFERENCES Appointment(appointment_id),
  FOREIGN KEY (donor_id) REFERENCES Person(person_id)
);

CREATE TABLE Inventory (
  inventory_id NUMBER PRIMARY KEY,
  donation_id NUMBER,
  blood_group VARCHAR2(10),
  quantity NUMBER,
  collection_date DATE,
  expiry_date DATE,
  status VARCHAR(15), -- Available/Reserved
  location VARCHAR(50),
  FOREIGN KEY (donation_id) REFERENCES Donation(donation_id)
);

CREATE TABLE Request (
  request_id NUMBER PRIMARY KEY,
  patient_id NUMBER,
  request_date DATE,
  quantity NUMBER,
  status VARCHAR2(15), -- Pending/Received
  blood_group VARCHAR2(10),
  hospital_name VARCHAR2(100),
  FOREIGN KEY (patient_id) REFERENCES Person(person_id)
);

CREATE TABLE Receive (
  receive_id NUMBER PRIMARY KEY,
  inventory_id NUMBER,
  receive_date DATE,
  quantity NUMBER,
  total_cost NUMBER,
  FOREIGN KEY (receive_id) REFERENCES Request(request_id),
  FOREIGN KEY (inventory_id) REFERENCES Inventory(inventory_id)
);

CREATE TABLE TransactionHistory (
  transaction_id NUMBER PRIMARY KEY,
  donation_id NUMBER,
  receive_id NUMBER,
  transaction_type VARCHAR2(50), --Donation/Receive
  transaction_date DATE,
  quantity NUMBER,
  FOREIGN KEY (donation_id) REFERENCES Donation(donation_id),
  FOREIGN KEY (receive_id) REFERENCES Receive(receive_id)
);