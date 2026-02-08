/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { SpecialtyService } from "./specialty.service";
import CatchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";

const SpecialtyController = CatchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const specialty = await SpecialtyService.CreateSpecialty(payload);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Specialty created successfully",
    data: specialty,
  });
});

const ShowAllSpecialty = CatchAsync(async (req: Request, res: Response) => {
  const specialty = await SpecialtyService.GetSpecialty();

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Specialty retrieved successfully",
    data: specialty,
  });
});
// delete specialty
const DeleteSpecialty = CatchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const specialty = await SpecialtyService.DeleteSpecialty(id as string);
  sendResponse(res, {
    httpStatusCode: 200,
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
  sendResponse(res, {
    httpStatusCode: 200,
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
