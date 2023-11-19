-- Trigger to automatically updates the status in the Appointment table 
CREATE OR REPLACE TRIGGER update_appointment_status
AFTER INSERT ON Donation
FOR EACH ROW
BEGIN
  UPDATE Appointment
  SET status = 'Donated'
  WHERE appointment_id = :new.appointment_id;
END;
/

-- Trigger to automatically updates the status in the Request table 
CREATE OR REPLACE TRIGGER update_request_status
AFTER INSERT ON Receive
FOR EACH ROW
BEGIN
  UPDATE Request
  SET status = 'Received'
  WHERE request_id = :new.request_id;
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
  v_transaction_id := TO_NUMBER(TO_CHAR(SYSDATE, 'DDMMYYHH24MISS') || :new.donation_id);

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

-- Trigger will insert data into the TransactionHistory table based on the Receive table:
CREATE OR REPLACE TRIGGER receive_transaction_trigger
AFTER INSERT ON Receive
FOR EACH ROW
DECLARE
  v_transaction_id NUMBER;
  v_donation_id NUMBER;
BEGIN
  v_donation_id := get_donation_id(:new.inventory_id); -- A Function Used here
  
  v_transaction_id := TO_NUMBER(TO_CHAR(SYSDATE, 'DDMMYYHH24MISS') || :new.receive_id);

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

-- This trigger includes a check for the new quantity in the Inventory table after the update.
-- If the new quantity is 0, it updates the status to 'Reserved'. 
-- If the new quantity is not 0, the status remains unchanged.
CREATE OR REPLACE TRIGGER update_inventory_status
AFTER INSERT ON Receive
FOR EACH ROW
DECLARE
  v_new_quantity NUMBER;
BEGIN
  UPDATE Inventory
  SET quantity = quantity - :NEW.quantity
  WHERE inventory_id = :NEW.inventory_id;

  SELECT quantity INTO v_new_quantity
  FROM Inventory
  WHERE inventory_id = :NEW.inventory_id;

  IF v_new_quantity = 0 THEN
    UPDATE Inventory
    SET status = 'Reserved'
    WHERE inventory_id = :NEW.inventory_id;
  END IF;
END;
/