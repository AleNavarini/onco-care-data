/*
  Warnings:

  - You are about to drop the `PreviousSurgeries` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PreviousSurgeries" DROP CONSTRAINT "PreviousSurgeries_patientId_fkey";

-- DropTable
DROP TABLE "PreviousSurgeries";

-- CreateTable
CREATE TABLE "PreviousSurgery" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "patientId" INT8,
    "surgeryType" STRING NOT NULL,
    "observations" STRING,

    CONSTRAINT "PreviousSurgery_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PreviousSurgery" ADD CONSTRAINT "PreviousSurgery_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
