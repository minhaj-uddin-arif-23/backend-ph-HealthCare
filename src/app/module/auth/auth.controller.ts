import { authService } from "./auth.service";
import CatchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { AccecTokenUitls } from "../../../utils/token";

const RegisterController = CatchAsync(async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Received registration data:", { name, email, password });
  const result = await authService.RegisterPatient({
    name,
    email,
    password,
  });

  // Check if result contains accessToken, refreshToken, and token

  const { accessToken, refreshToken, token, ...rest } = result;
  AccecTokenUitls.setAccessTokenCookie(res, accessToken as string);
  AccecTokenUitls.setRefreshTokenCookie(res, refreshToken as string);
  AccecTokenUitls.setBetterAuthSessionCookie(res, token as string);
  console.log(accessToken, refreshToken, token);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "User registered successfully",
    data: {
      ...rest,
      accessToken,
      refreshToken,
      token,
    },
  });

  // Handle the case where tokens are not present
  sendResponse(res, {
    httpStatusCode: 400,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const LoginController = CatchAsync(async (req, res) => {
  const { email, password } = req.body;
  console.log("Received login data:", { email, password });
  const result = await authService.LoginUser({
    email,
    password,
  });
  const { accessToken, refresshToken, token, ...rest } = result;
  AccecTokenUitls.setAccessTokenCookie(res, accessToken as string);
  AccecTokenUitls.setRefreshTokenCookie(res, refresshToken as string);
  AccecTokenUitls.setBetterAuthSessionCookie(res, token as string);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "User logged in successfully",
    data: {
      ...rest,
      accessToken,
      refreshToken: refresshToken,
      token,
    },
  });
});

export const AuthController = {
  RegisterController,
  LoginController,
};
