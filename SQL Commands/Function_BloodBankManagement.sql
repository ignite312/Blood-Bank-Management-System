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
    RETURN NULL;
END get_donation_id;
/