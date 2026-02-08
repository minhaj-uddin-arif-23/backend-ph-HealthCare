/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { SpecialtyService } from "./specialty.service";
import CatchAsync from "../../shared/catchAsync";

const SpecialtyController = CatchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const specialty = await SpecialtyService.CreateSpecialty(payload);
  res.status(201).json({
    success: true,
    message: "Specialty created successfully",
    data: specialty,
  });
});

const ShowAllSpecialty = CatchAsync(async (req: Request, res: Response) => {
  const specialty = await SpecialtyService.GetSpecialty();
  res.status(200).json({
    success: true,
    data: specialty,
  });
});
// delete specialty
const DeleteSpecialty = CatchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const specialty = await SpecialtyService.DeleteSpecialty(id as string);
  res.status(200).json({
    success: true,
    message: "Specialty deleted successfully",
    data: specialty,
  });
});

// update specialty
const UpdateSpecialty = CatchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const specialty = await SpecialtyService.UpdateSpecialty(
    id as string,
    payload,
  );
  res.status(200).json({
    success: true,
    message: "Specialty updated successfully",
    data: specialty,
  });
});

export const SpecialtyControllers = {
  SpecialtyController,
  ShowAllSpecialty,
  DeleteSpecialty,
  UpdateSpecialty,
};
