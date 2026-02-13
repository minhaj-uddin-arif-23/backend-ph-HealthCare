/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { EnvVariables } from "../config/env";
import status from "http-status";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (EnvVariables.NODE_ENV === "development") {
    console.log("error found");
    const statusCode: number = status.INTERNAL_SERVER_ERROR;
    const message: string = err.message || "Internal Server Error";

    res.status(statusCode).json({ success: false, message: message });
  }
};
