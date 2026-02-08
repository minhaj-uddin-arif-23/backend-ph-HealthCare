import { Specialty } from "../../../generated/prisma/client/client";
import { prisma } from "../../lib/prisma";

const CreateSpecialty = async (payload: Specialty): Promise<Specialty> => {
  const specialty = await prisma.specialty.create({
    data: payload,
  });
  return specialty;
};

export const SpecialtyService = {
  CreateSpecialty,
};
