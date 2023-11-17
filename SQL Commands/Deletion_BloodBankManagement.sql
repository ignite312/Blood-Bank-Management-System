-- Drop tables in reverse order of creation to avoid foreign key constraints
DROP TABLE TransactionHistory;
DROP TABLE Receive;
DROP TABLE Request;
DROP TABLE Inventory;
DROP TABLE Donation;
DROP TABLE Appointment;
DROP TABLE HealthHistory;
DROP TABLE Person;


-- Delete all data from all table
DELETE FROM TransactionHistory;
DELETE FROM Receive;
DELETE FROM Request;
DELETE FROM Inventory;
DELETE FROM Donation;
DELETE FROM Appointment;
DELETE FROM HealthHistory;
DELETE FROM Person;
