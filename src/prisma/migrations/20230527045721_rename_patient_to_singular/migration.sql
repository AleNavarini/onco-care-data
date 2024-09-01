/*
  Warnings:

  - You are about to drop the `Patients` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Patients";

-- CreateTable
CREATE TABLE "Patient" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "dni" STRING NOT NULL,
    "name" STRING NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "phone" STRING NOT NULL,
    "email" STRING NOT NULL,
    "address" STRING NOT NULL,
    "healthInsurance" STRING NOT NULL,
    "clinicHistory" INT8 NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);
