/*
  Warnings:

  - Added the required column `status` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('active', 'following');

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "status" "Status" NOT NULL;
