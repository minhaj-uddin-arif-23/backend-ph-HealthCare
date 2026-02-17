import { Router } from "express";
import { UserController } from "./user.controller";
import { validateSchema } from "../../middleware/zodValidateSchema";
import { CreateDoctorSchema } from "./user.validation";

const router = Router();

router.post(
  "/create-doctor",
  // this middleware helps us to make zod validation,for more schema
  validateSchema(CreateDoctorSchema),

  UserController.createDoctorController,
);
export const UserRoute = router;
