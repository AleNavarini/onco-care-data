/*
  Warnings:

  - You are about to drop the column `patientId` on the `Disease` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Disease_patientId_key";

-- AlterTable
ALTER TABLE "Disease" DROP COLUMN "patientId";
