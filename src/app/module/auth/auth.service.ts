import { Status } from "@prisma/client";
import { auth } from "../../lib/auth";

interface IRegisterPatient {
  name: string;
  email: string;
  password: string;
}
interface ILoginUser {
  email: string;
  password: string;
}
//* create patient (user model) and patient model in one transaction that is one to one relationship

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
    throw new Error("User registration failed");
  }

  //TODO : create patient profile in transaction (after sign-up) with user creation

  return data;
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
    throw new Error("User is blocked. Please contact support.");
  }
  if (data.user && data.user.status === Status.CANCELLED) {
    throw new Error("User is cancelled. Please contact support.");
  }
  return data;
};

export const authService = {
  RegisterPatient,
  LoginUser,
};
