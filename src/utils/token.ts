import { JwtPayload, SignOptions } from "jsonwebtoken";
import { JWtUtils } from "./jwt";
import { EnvVariables } from "../config/env";
import { CookieUtils } from "./cookie";
import { Response } from "express";

const getAccessToken = (payload: JwtPayload) => {
  const accessToken = JWtUtils.createJwtToken(
    payload,
    EnvVariables.ACCESS_TOKEN_SECRET,
    { expiresIn: EnvVariables.ACCESS_TOKEN_EXPIRES_IN } as SignOptions,
  );
  return accessToken;
};

const refreehToken = (payload: JwtPayload) => {
  const accessToken = JWtUtils.createJwtToken(
    payload,
    EnvVariables.REFRESH_TOKEN_SECRET,
    { expiresIn: EnvVariables.REFRESH_TOKEN_EXPIRES_IN } as SignOptions,
  );
  return accessToken;
};

const setAccessTokenCookie = (res: Response, token: string) => {
  CookieUtils.setCookie(res, "access_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    // 1 dday
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
  });
};

const setRefreshTokenCookie = (res: Response, token: string) => {
  CookieUtils.setCookie(res, "refresh_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    // 7 days
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  });
};

const setBetterAuthSessionCookie = (res: Response, token: string) => {
  CookieUtils.setCookie(res, "better_auth.session_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    // 1 day
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
  });
};

export const AccecTokenUitls = {
  getAccessToken,
  refreehToken,
  setAccessTokenCookie,
  setRefreshTokenCookie,
  setBetterAuthSessionCookie,
};
