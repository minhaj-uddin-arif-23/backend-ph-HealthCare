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

const ShowAllSpecialty = async (req: Request, res: Response) => {
  try {
    const specialty = await SpecialtyService.GetSpecialty();
    res.status(200).json({
      success: true,
      data: specialty,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
// delete specialty
const DeleteSpecialty = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const specialty = await SpecialtyService.DeleteSpecialty(id as string);
    res.status(200).json({
      success: true,
      message: "Specialty deleted successfully",
      data: specialty,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// update specialty
const UpdateSpecialty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const specilty = await SpecialtyService.UpdateSpecialty(
      id as string,
      payload,
    );
    res.status(200).json({
      success: true,
      message: "Specialty updated successfully",
      data: specilty,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const SpecialtyControllers = {
  SpecialtyController,
  ShowAllSpecialty,
  DeleteSpecialty,
  UpdateSpecialty,
};
