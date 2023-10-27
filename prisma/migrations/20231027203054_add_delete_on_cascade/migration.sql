-- DropForeignKey
ALTER TABLE "RiskFactor" DROP CONSTRAINT "RiskFactor_patientId_fkey";

-- AddForeignKey
ALTER TABLE "RiskFactor" ADD CONSTRAINT "RiskFactor_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
