import { NextFunction, Request, Response } from "express";

import { z } from "zod";
// middleware zod schema

export const validateSchema = (zodSchema: z.ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body, "Before zod validation");

    const parsedResult = zodSchema.safeParse(req.body);
    if (!parsedResult.success) {
      return next(parsedResult.error);
    }
    // sanitizing the data
    req.body = parsedResult.data;
    console.log(req.body, "after zod validation");
    next();
  };
};
