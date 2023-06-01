-- CreateTable
CREATE TABLE "StudyType" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "name" STRING NOT NULL,

    CONSTRAINT "StudyType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyTypeAttribute" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "studyTypeId" INT8 NOT NULL,
    "name" STRING NOT NULL,
    "value" STRING,
    "studyId" INT8,

    CONSTRAINT "StudyTypeAttribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Study" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "studyTypeId" INT8 NOT NULL,
    "patientId" INT8,

    CONSTRAINT "Study_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StudyTypeAttribute" ADD CONSTRAINT "StudyTypeAttribute_studyTypeId_fkey" FOREIGN KEY ("studyTypeId") REFERENCES "StudyType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyTypeAttribute" ADD CONSTRAINT "StudyTypeAttribute_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Study" ADD CONSTRAINT "Study_studyTypeId_fkey" FOREIGN KEY ("studyTypeId") REFERENCES "StudyType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Study" ADD CONSTRAINT "Study_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
