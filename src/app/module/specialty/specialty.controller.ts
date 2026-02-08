/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { SpecialtyService } from "./specialty.service";

const SpecialtyController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const specialty = await SpecialtyService.CreateSpecialty(payload);
    res.status(201).json({
      success: true,
      data: specialty,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
export const SpecialtyControllers = {
  SpecialtyController,
};
