import { Request, Response } from "express";
import CatchAsync from "../shared/catchAsync";
import sendResponse from "../shared/sendResponse";
import { UserService } from "./user.service";
import status from "http-status";

const createDoctorController = CatchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;
    console.log("Received Doctor registration data:", payload);
    const user = await UserService.createDoctor(payload);

    sendResponse(res, {
      httpStatusCode: status.CREATED,
      success: true,
      message: "Doctor registered successfully",
      data: user,
    });
  },
);

export const UserController = {
  createDoctorController,
};
