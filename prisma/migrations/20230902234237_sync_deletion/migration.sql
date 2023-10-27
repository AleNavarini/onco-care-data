
/*
  Warnings:

  - Added the required column `status` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/

ALTER TABLE public."RiskFactor" DROP CONSTRAINT "RiskFactor_diseaseId_fkey";
ALTER TABLE public."RiskFactor" DROP CONSTRAINT "RiskFactor_patientId_fkey";

-- Removing foreign key constraint from Disease table
ALTER TABLE public."Disease" DROP CONSTRAINT "Disease_patientId_fkey";

-- Dropping tables
DROP TABLE public."RiskFactor";
DROP TABLE public."Disease";
