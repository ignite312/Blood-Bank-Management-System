-- This procedure uses an UPDATE statement to change the status of inventory items to "Expired" 
-- where the expiry_date is less than the current system date (SYSDATE). 
-- The COMMIT statement is used to make the changes permanent.
CREATE OR REPLACE PROCEDURE UpdateExpiredInventoryStatus AS
BEGIN
  UPDATE Inventory
  SET status = 'Expired'
  WHERE expiry_date < SYSDATE and status = 'Available';
  
  COMMIT;
END UpdateExpiredInventoryStatus;
/


-- To Run UpdateExpiredInventoryStatus
BEGIN
  UpdateExpiredInventoryStatus;
END;