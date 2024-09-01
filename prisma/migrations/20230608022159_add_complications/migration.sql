-- CreateTable
CREATE TABLE "Complication" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "treatmentId" INT8,
    "time" STRING NOT NULL,
    "type" STRING NOT NULL,
    "transfusions" STRING NOT NULL,

    CONSTRAINT "Complication_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Complication" ADD CONSTRAINT "Complication_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "Treatment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
