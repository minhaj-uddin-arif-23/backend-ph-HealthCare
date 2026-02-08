import { Specialty } from "../../../generated/prisma/client/client";
import { prisma } from "../../lib/prisma";

const CreateSpecialty = async (payload: Specialty): Promise<Specialty> => {
  const specialty = await prisma.specialty.create({
    data: payload,
  });
  return specialty;
};

const GetSpecialty = async (): Promise<Specialty[]> => {
  const specialty = await prisma.specialty.findMany();
  return specialty;
};

// delete specialty
const DeleteSpecialty = async (id: string): Promise<Specialty> => {
  const specialty = await prisma.specialty.delete({
    where: { id },
  });
  return specialty;
};

// update specialty
const UpdateSpecialty = async (
  id: string,
  payload: Partial<Specialty>,
): Promise<Specialty> => {
  const specialty = await prisma.specialty.update({
    where: { id },
    data: payload,
  });
  return specialty;
};

export const SpecialtyService = {
  CreateSpecialty,
  GetSpecialty,
  DeleteSpecialty,
  UpdateSpecialty,
};
