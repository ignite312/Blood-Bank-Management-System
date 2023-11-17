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