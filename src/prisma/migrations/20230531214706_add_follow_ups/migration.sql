-- CreateTable
CREATE TABLE "FollowUp" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "patientId" INT8,
    "date" TIMESTAMP(3) NOT NULL,
    "attended" BOOL NOT NULL,
    "hasDisease" BOOL NOT NULL,
    "recurrenceSite" STRING,
    "died" BOOL NOT NULL,
    "causeOfDeath" STRING,
    "observations" STRING,

    CONSTRAINT "FollowUp_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FollowUp" ADD CONSTRAINT "FollowUp_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
