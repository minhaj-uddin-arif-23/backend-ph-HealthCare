import { Role, Specialty } from "@prisma/client";
import { ICreateDoctorPayload } from "./user.interface";
import { prisma } from "../lib/prisma";
import { auth } from "../lib/auth";

// createDoctor with specialties
const createDoctor = async (payload: ICreateDoctorPayload) => {
  const speciltys: Specialty[] = [];
  for (const speciltyId of payload.specialties) {
    const specilty = await prisma.specialty.findFirst({
      where: {
        title: {
          equals: speciltyId,
          mode: "insensitive",
        },
        isDeleted: false,
      },
    });

    if (!specilty) {
      throw new Error(`Specialty with id ${speciltyId} not found`);
    }
    speciltys.push(specilty);
  }
  // check user already has doctor profile
  const existingDoctor = await prisma.user.findUnique({
    where: {
      email: payload.doctor.email,
    },
  });
  if (existingDoctor) {
    throw new Error("User already has a doctor profile");
  }

  const userData = await auth.api.signUpEmail({
    body: {
      name: payload.doctor.name,
      email: payload.doctor.email,
      password: payload.password,
      role: Role.DOCTOR,
      needPasswordChange: true,
    },
  });

  if (!userData.user) {
    throw new Error("User registration failed");
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create doctor
      const createdDoctor = await tx.doctor.create({
        data: {
          userId: userData.user!.id,
          name: payload.doctor.name,
          email: payload.doctor.email,
          profilePhoto: payload.doctor.profilePhoto,
          contactNumber: payload.doctor.contactNumber,
          address: payload.doctor.address,

          registrationNumber: payload.doctor.registrationNumber,
          experienceYears: payload.doctor.experienceYears as number,
          qualification: payload.doctor.qualification,
          appointmentFee: payload.doctor.appointmentFee,
          currenworkingPlace: payload.doctor.currenworkingPlace,
          designation: payload.doctor.designation,
          gender: payload.doctor.gender,
        },
      });

      // 2. Prepare specialty mapping
      const doctorSpecialtyData = speciltys.map((specilty) => ({
        doctorId: createdDoctor.id,
        specialtyId: specilty.id,
      }));

      // 3. Insert specialties
      await tx.doctorSpecialty.createMany({
        data: doctorSpecialtyData,
      });

      // 4. Fetch full doctor profile
      const doctorWithRelations = await tx.doctor.findUnique({
        where: {
          id: createdDoctor.id,
        },
        select: {
          id: true,
          userId: true,
          name: true,
          email: true,
          contactNumber: true,
          profilePhoto: true,
          address: true,
          gender: true,
          qualification: true,
          appointmentFee: true,
          currenworkingPlace: true,
          createdAt: true,
          updatedAt: true,
          avgRating: true,
          designation: true,
          registrationNumber: true,
          experienceYears: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              status: true,
              emailVerified: true,
              deletedAt: true,
              image: true,
              isDeleted: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          specialties: {
            select: {
              specialty: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
          },
        },
      });

      return doctorWithRelations;
    });

    return result;
  } catch (error) {
    console.error("Doctor Registration transaction error:", error);

    await prisma.user.delete({
      where: {
        id: userData.user!.id,
      },
    });

    throw error;
  }
};

export const UserService = {
  createDoctor,
};
