-- DropForeignKey
ALTER TABLE "TreatmentTypeAttribute" DROP CONSTRAINT "TreatmentTypeAttribute_treatmentId_fkey";

-- DropForeignKey
ALTER TABLE "TreatmentTypeResult" DROP CONSTRAINT "TreatmentTypeResult_treatmentId_fkey";

-- AddForeignKey
ALTER TABLE "TreatmentTypeAttribute" ADD CONSTRAINT "TreatmentTypeAttribute_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "Treatment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreatmentTypeResult" ADD CONSTRAINT "TreatmentTypeResult_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "Treatment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
