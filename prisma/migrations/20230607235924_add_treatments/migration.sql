-- CreateTable
CREATE TABLE "TreatmentType" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "name" STRING NOT NULL,

    CONSTRAINT "TreatmentType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TreatmentTypeAttribute" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "treatmentTypeId" INT8 NOT NULL,
    "name" STRING NOT NULL,
    "value" STRING,
    "treatmentId" INT8,

    CONSTRAINT "TreatmentTypeAttribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TreatmentTypeResult" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "treatmentTypeId" INT8 NOT NULL,
    "name" STRING NOT NULL,
    "value" STRING,
    "treatmentId" INT8,

    CONSTRAINT "TreatmentTypeResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Treatment" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "treatmentTypeId" INT8 NOT NULL,
    "patientId" INT8,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),

    CONSTRAINT "Treatment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TreatmentTypeAttribute" ADD CONSTRAINT "TreatmentTypeAttribute_treatmentTypeId_fkey" FOREIGN KEY ("treatmentTypeId") REFERENCES "TreatmentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreatmentTypeAttribute" ADD CONSTRAINT "TreatmentTypeAttribute_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "Treatment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreatmentTypeResult" ADD CONSTRAINT "TreatmentTypeResult_treatmentTypeId_fkey" FOREIGN KEY ("treatmentTypeId") REFERENCES "TreatmentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreatmentTypeResult" ADD CONSTRAINT "TreatmentTypeResult_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "Treatment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treatment" ADD CONSTRAINT "Treatment_treatmentTypeId_fkey" FOREIGN KEY ("treatmentTypeId") REFERENCES "TreatmentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treatment" ADD CONSTRAINT "Treatment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
