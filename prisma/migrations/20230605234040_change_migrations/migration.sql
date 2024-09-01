/*
  Warnings:

  - You are about to drop the column `abortion` on the `Gestation` table. All the data in the column will be lost.
  - You are about to drop the column `birth` on the `Gestation` table. All the data in the column will be lost.
  - You are about to drop the column `cesarean` on the `Gestation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[patientId]` on the table `Gestation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `abortions` to the `Gestation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `births` to the `Gestation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cesareans` to the `Gestation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gestation" DROP COLUMN "abortion";
ALTER TABLE "Gestation" DROP COLUMN "birth";
ALTER TABLE "Gestation" DROP COLUMN "cesarean";
ALTER TABLE "Gestation" ADD COLUMN     "abortions" INT4 NOT NULL;
ALTER TABLE "Gestation" ADD COLUMN     "births" INT4 NOT NULL;
ALTER TABLE "Gestation" ADD COLUMN     "cesareans" INT4 NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Gestation_patientId_key" ON "Gestation"("patientId");
