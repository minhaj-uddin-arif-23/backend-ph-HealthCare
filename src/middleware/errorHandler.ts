/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { number, ZodError } from "zod";
import { Prisma } from "@prisma/client";
import status from "http-status";
import { EnvVariables } from "../config/env";
import { formatStack } from "../utils/formatStack";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode: number = status.INTERNAL_SERVER_ERROR;
  let message = "Internal Server Error";
  let errors: any = null;
  let stackInfo = null;

  /* ---------- ZOD ERROR ---------- */
  if (err instanceof ZodError) {
    statusCode = status.BAD_REQUEST;
    message = "Validation Error";

    errors = err.issues.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));

    stackInfo = formatStack(err.stack);
  } else if (
    /* ---------- PRISMA DUPLICATE ERROR ---------- */
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === "P2002"
  ) {
    statusCode = status.CONFLICT;
    message = "Duplicate value error";

    errors = Array.isArray(err.meta?.target)
      ? (err.meta?.target as string[]).map((field) => ({
          field,
          message: `${field} already exists`,
        }))
      : [{ message: "Unique constraint failed" }];

    stackInfo =
      EnvVariables.NODE_ENV === "development"
        ? {
            type: "PrismaError",
            code: err.code,
            location: formatStack(err.stack),
          }
        : null;
  } else if (err instanceof Error) {
    /* ---------- NORMAL ERROR ---------- */
    message = err.message;
    stackInfo = formatStack(err.stack);
  }

  /* ---------- DEV LOG ---------- */
  if (EnvVariables.NODE_ENV === "development") {
    console.error("🚨 ERROR");
    console.error("➡️ Route:", req.method, req.originalUrl);
    console.error("➡️ Message:", message);
    console.error("➡️ Errors:", errors);
    console.error("➡️ Stack:", stackInfo);
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
    stack: EnvVariables.NODE_ENV === "development" ? stackInfo : undefined,
  });
};
