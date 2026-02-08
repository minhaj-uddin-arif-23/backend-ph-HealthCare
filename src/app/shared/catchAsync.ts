/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, RequestHandler, Response } from "express";

const CatchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve ",
        error: error.message,
      });
    }
  };
};

export default CatchAsync;
