import { authService } from "./auth.service";
import CatchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";

const RegisterController = CatchAsync(async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Received registration data:", { name, email, password });
  const user = await authService.RegisterPatient({
    name,
    email,
    password,
  });
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "User registered successfully",
    data: user,
  });
});

const LoginController = CatchAsync(async (req, res) => {
  const { email, password } = req.body;
  console.log("Received login data:", { email, password });
  const user = await authService.LoginUser({
    email,
    password,
  });
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "User logged in successfully",
    data: user,
  });
});

export const AuthController = {
  RegisterController,
  LoginController,
};
