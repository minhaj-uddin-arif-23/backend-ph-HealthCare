import { Status } from "@prisma/client";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import AppError from "../../../errorHelpers/AppError";
import status from "http-status";

interface IRegisterPatient {
  name: string;
  email: string;
  password: string;
}
interface ILoginUser {
  email: string;
  password: string;
}
// create patient (user model) and patient model in one transaction that is one to one relationship

const RegisterPatient = async (payload: IRegisterPatient) => {
  const { name, email, password } = payload;
  const data = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
  });
  if (!data.user) {
    throw new AppError(status.BAD_REQUEST, "User registration failed");
  }

  //TODO : create patient profile in transaction (after sign-up) with user creation(useId)

  try {
    const patientProfile = await prisma.$transaction(async (tx) => {
      const patient = await tx.patient.create({
        data: {
          name: payload.name,
          email: payload.email,

          userId: data.user!.id,
        },
      });
      return patient;
    });

    return { ...data, patientProfile };
  } catch (error) {
    console.log("Transaction error: ", error);
    await prisma.user.delete({
      where: {
        id: data.user!.id,
      },
    });
    throw Error;
  }
};

const LoginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;
  const data = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });
  if (data.user && data.user.status === Status.BLOCKED) {
    throw new AppError(
      status.NOT_FOUND,
      "User is blocked. Please contact support.",
    );
  }
  if (data.user && data.user.status === Status.CANCELLED) {
    throw new AppError(
      status.FORBIDDEN,
      "User is cancelled. Please contact support.",
    );
  }
  return data;
};

export const authService = {
  RegisterPatient,
  LoginUser,
};
