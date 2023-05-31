-- CreateTable
CREATE TABLE "Staging" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "patientId" INT8,
    "date" TIMESTAMP(3) NOT NULL,
    "type" STRING NOT NULL,
    "figo" STRING NOT NULL,

    CONSTRAINT "Staging_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Staging" ADD CONSTRAINT "Staging_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
