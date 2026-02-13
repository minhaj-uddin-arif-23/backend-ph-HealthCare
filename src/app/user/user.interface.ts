import { Gender } from "@prisma/client";

export interface ICreateDoctorPayload {
  password: string;
  doctor: {
    name: string;
    email: string;
    contactNumber?: string;
    profilePhoto?: string;
    address?: string;
    registrationNumber: string;
    experienceYears?: number;
    gender: Gender;
    qualification: string;
    appointmentFee: number;
    currenworkingPlace: string;
    avgRating: number;
    designation: string;
  };
  specialties: string[];
}
