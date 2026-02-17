import { Gender } from "@prisma/client";
import z from "zod";

export const GenderEnum = z.enum(
  [Gender.MALE, Gender.FEMALE, Gender.OTHER],
  " Gender must be either 'MALE', 'FEMALE', or 'OTHER'",
);

const trimmedString = (min = 1, max = 255) =>
  z
    .string()
    .trim()
    .min(min, "Field is required")
    .max(max, `Must be less than ${max} characters`);

const bdPhoneRegex = /^(?:\+8801|01)[3-9]\d{8}$/;
const bmdcRegex = /^BMDC-\d{4}-\d{5,6}$/;

export const DoctorSchema = z
  .object({
    name: z
      .string("Name is required")
      .min(5, "Name must be at least 5 characters")
      .max(30, "Name must be at least 30 characters"),
    email: z.email("Invalid email format").toLowerCase(),

    contactNumber: z
      .string()
      .regex(bdPhoneRegex, "Invalid Bangladeshi phone number")
      .optional(),

    profilePhoto: z.string().url("Invalid profile photo URL").optional(),

    address: trimmedString(5, 200).optional(),

    registrationNumber: z
      .string()
      .regex(bmdcRegex, "Invalid BMDC registration number"),

    experienceYears: z.number().int().min(0).max(60).optional(),

    gender: GenderEnum,

    qualification: trimmedString(3, 150),

    appointmentFee: z
      .number()
      .min(100, "Appointment fee too low")
      .max(50000, "Appointment fee too high"),

    currenworkingPlace: trimmedString(3, 150),

    avgRating: z.number().min(0).max(5).optional(),

    designation: trimmedString(3, 100),
  })
  .strict();

/* =======================
   MAIN PAYLOAD SCHEMA
======================= */

export const UpdateDoctorSchema = z
  .object({
    password: z
      .string()
      .min(10, "Password must be at least 10 characters")
      .max(128)
      .regex(/[A-Z]/, "Password must contain an uppercase letter")
      .regex(/[a-z]/, "Password must contain a lowercase letter")
      .regex(/\d/, "Password must contain a number")
      .regex(/[@$!%*?&]/, "Password must contain a special character"),

    doctor: DoctorSchema,

    specialties: z
      .array(
        z
          .string()
          .trim()
          .min(2, "Specialty must be at least 2 characters")
          .max(50, "Specialty must be less than 50 characters")
          .regex(/^[a-zA-Z\s]+$/, "Specialty must contain only letters"),
      )
      .min(1, "At least one specialty is required")
      .max(10, "Too many specialties")
      .refine(
        (items) =>
          new Set(items.map((i) => i.toLowerCase())).size === items.length,
        "Duplicate specialties are not allowed",
      ),
  })
  .partial();
