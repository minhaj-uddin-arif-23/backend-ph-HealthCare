-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateTable
CREATE TABLE "doctor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contactNumber" TEXT,
    "address" TEXT,
    "registrationNumber" TEXT NOT NULL,
    "experienceYears" INTEGER NOT NULL,
    "qualification" TEXT NOT NULL,
    "appointmentFee" DOUBLE PRECISION NOT NULL,
    "currenworkingPlace" TEXT NOT NULL,
    "avgRating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "designation" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctor_specialties" (
    "doctorId" TEXT NOT NULL,
    "specialtyId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "doctor_email_key" ON "doctor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "doctor_registrationNumber_key" ON "doctor"("registrationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "doctor_userId_key" ON "doctor"("userId");

-- CreateIndex
CREATE INDEX "idx_doctor_name" ON "doctor"("name");

-- CreateIndex
CREATE INDEX "idx_doctor_email" ON "doctor"("email");

-- CreateIndex
CREATE INDEX "idx_doctor_isDeleted" ON "doctor"("isDeleted");

-- CreateIndex
CREATE INDEX "idx_doctor_specialty_doctorId" ON "doctor_specialties"("doctorId");

-- CreateIndex
CREATE INDEX "idx_doctor_specialty_specialtyId" ON "doctor_specialties"("specialtyId");

-- CreateIndex
CREATE UNIQUE INDEX "doctor_specialties_doctorId_specialtyId_key" ON "doctor_specialties"("doctorId", "specialtyId");

-- AddForeignKey
ALTER TABLE "doctor" ADD CONSTRAINT "doctor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor_specialties" ADD CONSTRAINT "doctor_specialties_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor_specialties" ADD CONSTRAINT "doctor_specialties_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "specialties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
