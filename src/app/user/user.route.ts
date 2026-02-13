import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.post("/create-doctor", UserController.createDoctorController);
export const UserRoute = router;
