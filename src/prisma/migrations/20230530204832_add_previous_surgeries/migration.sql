-- CreateTable
CREATE TABLE "PreviousSurgeries" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "patientId" INT8,
    "surgeryType" STRING NOT NULL,
    "observations" STRING,

    CONSTRAINT "PreviousSurgeries_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PreviousSurgeries" ADD CONSTRAINT "PreviousSurgeries_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
