/* eslint-disable @typescript-eslint/no-unused-vars */
import { Status } from "@prisma/client";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import AppError from "../../../errorHelpers/AppError";
import status from "http-status";
import { AccecTokenUitls } from "../../../utils/token";

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
  console.log(name);
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
    // 1️⃣ Only DB logic inside transaction
    const patient = await prisma.$transaction(async (tx) => {
      return tx.patient.create({
        data: {
          name: payload.name,
          email: payload.email,
          userId: data.user!.id,
        },
      });
    });

    // 2️⃣ Token payload
    const tokenPayload = {
      userId: data.user!.id,
      role: data.user!.role,
      name: data.user!.name,
      email: data.user!.email,
      status: data.user!.status,
      isDeleted: data.user!.isDeleted,
      emailVerified: data.user!.emailVerified, // fixed typo
    };

    // 3️⃣ Create tokens OUTSIDE transaction
    const accessToken = AccecTokenUitls.getAccessToken(tokenPayload);
    const refreshToken = AccecTokenUitls.refreehToken(tokenPayload);

    // 4️⃣ Final return
    return {
      ...data,
    
        ...patient,
        accessToken,
        refreshToken,
        token: data.token,
      
    };
  } catch (error) {
    console.error("Transaction error:", error);

    if (data.user?.id) {
      await prisma.user.delete({
        where: { id: data.user.id },
      });
    }

    throw error; // ✅ correct
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

  const accessToken = AccecTokenUitls.getAccessToken({
    userId: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    status: data.user.status,
    isDeleted: data.user.isDeleted,
    emalVerified: data.user.emailVerified,
  });

  const refresshToken = AccecTokenUitls.refreehToken({
    userId: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    status: data.user.status,
    isDeleted: data.user.isDeleted,
    emalVerified: data.user.emailVerified,
  });
  return {
    ...data,
    accessToken,
    refresshToken,
  };
};

export const authService = {
  RegisterPatient,
  LoginUser,
};
