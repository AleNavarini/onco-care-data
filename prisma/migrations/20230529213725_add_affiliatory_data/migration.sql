-- CreateTable
CREATE TABLE "AffiliatoryData" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "patientId" INT8,
    "firstConsult" TIMESTAMP(3),
    "institution" STRING,
    "doctor" STRING,
    "bmi" DECIMAL(65,30),
    "usualMedication" STRING,
    "socialWorkIntervention" STRING,
    "firstPregnancyAge" INT4,
    "lastPregnancyAge" INT4,
    "contraception" STRING,
    "currentPregnancyControl" STRING,

    CONSTRAINT "AffiliatoryData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AffiliatoryData_patientId_key" ON "AffiliatoryData"("patientId");

-- AddForeignKey
ALTER TABLE "AffiliatoryData" ADD CONSTRAINT "AffiliatoryData_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
