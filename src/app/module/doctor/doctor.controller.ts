import status from "http-status";
import CatchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { DoctorService } from "./doctor.service";

const getAllDoctors = CatchAsync(async (req, res) => {
  const doctors = await DoctorService.getAllDoctors();
  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Doctors retrieved successfully",
    data: doctors,
  });
});
// get doctor by id
const getDoctorById = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const doctor = await DoctorService.getDoctorById(id as string);
  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Doctor retrieved successfully",
    data: doctor,
  });
});
export const DoctorController = {
  getAllDoctors,
  getDoctorById,
};
