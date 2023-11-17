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

-- Trigger to automatically updates the status in the Appointment table 
CREATE OR REPLACE TRIGGER update_appointment_status
AFTER INSERT ON Donation
FOR EACH ROW
BEGIN
  UPDATE Appointment
  SET status = 'Donated'
  WHERE appointment_id = :new.donation_id;
END;
/

-- Trigger to automatically updates the status in the Request table 
CREATE OR REPLACE TRIGGER update_request_status
AFTER INSERT ON Receive
FOR EACH ROW
BEGIN
  UPDATE Request
  SET status = 'Received'
  WHERE request_id = :new.receive_id;
END;
/

-- This trigger will generate a transaction record based on the donation_id and the current date/time 
-- whenever a new donation record is inserted into the Donation table.
CREATE OR REPLACE TRIGGER donation_transaction_trigger
AFTER INSERT ON Donation
FOR EACH ROW
DECLARE
  v_transaction_id NUMBER;
BEGIN
  -- Generate a transaction_id based on current date/time and donation_id
  v_transaction_id := TO_NUMBER(TO_CHAR(SYSDATE, 'DDMMYYHH24MISS') || :new.donation_id);

  -- Insert the transaction record
  INSERT INTO TransactionHistory (
    transaction_id,
    donation_id,
    transaction_type,
    transaction_date,
    quantity
  ) VALUES (
    v_transaction_id,
    :new.donation_id,
    'Donation',
    :new.donation_date,
    :new.quantity
  );
END;
/


-- This function performs a simple SELECT query on the Inventory table using the provided inventory_id to retrieve the associated donation_id.
-- If a match is found, it returns the donation_id; otherwise, it returns NULL.
CREATE OR REPLACE FUNCTION get_donation_id(p_inventory_id NUMBER) RETURN NUMBER IS
  v_donation_id NUMBER;
BEGIN
  SELECT donation_id
  INTO v_donation_id
  FROM Inventory
  WHERE inventory_id = p_inventory_id;

  RETURN v_donation_id;
EXCEPTION
  WHEN NO_DATA_FOUND THEN
    RETURN NULL; -- or handle the exception as needed
END get_donation_id;
/


-- Trigger will insert data into the TransactionHistory table based on the Receive table:
CREATE OR REPLACE TRIGGER receive_transaction_trigger
AFTER INSERT ON Receive
FOR EACH ROW
DECLARE
  v_transaction_id NUMBER;
  v_donation_id NUMBER;
BEGIN
  -- Get the donation_id using the get_donation_id function
  v_donation_id := get_donation_id(:new.inventory_id);

  -- Generate a transaction_id based on current date/time and receive_id
  v_transaction_id := TO_NUMBER(TO_CHAR(SYSDATE, 'DDMMYYHH24MISS') || :new.receive_id);

  -- Insert the transaction record for "Receive"
  INSERT INTO TransactionHistory (
    transaction_id,
    donation_id,
    receive_id,
    transaction_type,
    transaction_date,
    quantity
  ) VALUES (
    v_transaction_id,
    v_donation_id,
    :new.receive_id,
    'Receive',
    :new.receive_date,
    :new.quantity
  );
END;
/

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
INSERT INTO Donation (donation_id, donor_id, donation_date, quantity, blood_group)
VALUES (111, 1, TO_DATE('2023-01-02', 'YYYY-MM-DD'), 3, 'O+');

INSERT INTO Donation (donation_id, donor_id, donation_date, quantity, blood_group)
VALUES (222, 2, TO_DATE('2023-01-02', 'YYYY-MM-DD'), 2, 'A+');


-- Insert data into Inventory table
INSERT INTO Inventory (inventory_id, donation_id, blood_group, quantity, status, collection_date, expiry_date, location)
VALUES (1000, 111, 'O+', 3, 'Available', TO_DATE('2023-01-02', 'YYYY-MM-DD'), TO_DATE('2023-01-05', 'YYYY-MM-DD'), 'Hospital A');

INSERT INTO Inventory (inventory_id, donation_id, blood_group, quantity, status, collection_date, expiry_date, location)
VALUES (2000, 222, 'A+', 2, 'Available', TO_DATE('2023-01-02', 'YYYY-MM-DD'), TO_DATE('2023-01-04', 'YYYY-MM-DD'), 'Hospital B');


-- Insert data into Request table
INSERT INTO Request (request_id, patient_id, request_date, quantity, status, blood_group, hospital_name) 
VALUES (534, 3, TO_DATE('2023-01-02', 'YYYY-MM-DD'), 4, 'Pending', 'O+', 'MMC');

INSERT INTO Request (request_id, patient_id, request_date, quantity, status, blood_group, hospital_name) 
VALUES (383, 4, TO_DATE('2023-01-02', 'YYYY-MM-DD'), 2, 'Pending', 'AB-', 'CMH');

INSERT INTO Request (request_id, patient_id, request_date, quantity, status, blood_group, hospital_name) 
VALUES (414, 5, TO_DATE('2023-01-02', 'YYYY-MM-DD'), 2, 'Pending', 'A+', 'MMC');


-- Insert data into Receive table
INSERT INTO Receive (receive_id, inventory_id, receive_date, quantity, total_cost) 
VALUES (534, 2000, TO_DATE('2023-01-02', 'YYYY-MM-DD'), 3, 1000);

INSERT INTO Receive (receive_id, inventory_id, receive_date, quantity, total_cost) 
VALUES (414, 1000, TO_DATE('2023-01-02', 'YYYY-MM-DD'), 2, 5000);




-- -- Drop tables in reverse order of creation to avoid foreign key constraints
-- DROP TABLE TransactionHistory;
-- DROP TABLE Receive;
-- DROP TABLE Request;
-- DROP TABLE Inventory;
-- DROP TABLE Donation;
-- DROP TABLE Appointment;
-- DROP TABLE HealthHistory;
-- DROP TABLE Person;


-- -- Delete all data from all table
-- DELETE FROM TransactionHistory;
-- DELETE FROM Receive;
-- DELETE FROM Request;
-- DELETE FROM Inventory;
-- DELETE FROM Donation;
-- DELETE FROM Appointment;
-- DELETE FROM HealthHistory;
-- DELETE FROM Person;
