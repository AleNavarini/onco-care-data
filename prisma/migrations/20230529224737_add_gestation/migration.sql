-- CreateTable
CREATE TABLE "Gestation" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "patientId" INT8,
    "birth" BOOL,
    "abortion" BOOL,
    "cesarean" BOOL,

    CONSTRAINT "Gestation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Gestation_patientId_key" ON "Gestation"("patientId");

-- AddForeignKey
ALTER TABLE "Gestation" ADD CONSTRAINT "Gestation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
