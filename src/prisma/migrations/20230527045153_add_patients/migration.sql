-- CreateTable
CREATE TABLE "Patients" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "dni" STRING NOT NULL,
    "name" STRING NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "phone" STRING NOT NULL,
    "email" STRING NOT NULL,
    "address" STRING NOT NULL,
    "healthInsurance" STRING NOT NULL,
    "clinicHistory" INT8 NOT NULL,

    CONSTRAINT "Patients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patients_dni_key" ON "Patients"("dni");
