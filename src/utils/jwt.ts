/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const createJwtToken = (
  payload: JwtPayload,
  secret: string,
  { expiresIn }: SignOptions,
) => {
  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
};

const verifyJwtToken = (token: string, secret: string) => {
  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    return {
      success: true,
      data: decoded,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      error,
    };
  }
};

const decodeJwtToken = (token: string) => {
  const decodeToken = jwt.decode(token) as JwtPayload;
  return decodeToken;
};
export const JWtUtils = {
  createJwtToken,
  verifyJwtToken,
  decodeJwtToken,
};
