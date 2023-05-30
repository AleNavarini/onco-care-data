-- CreateTable
CREATE TABLE "Symptom" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "patientId" INT8,
    "name" STRING NOT NULL,
    "value" INT4,

    CONSTRAINT "Symptom_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Symptom" ADD CONSTRAINT "Symptom_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
