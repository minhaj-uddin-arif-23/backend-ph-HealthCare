import { Router } from "express";
import { SpecialtyControllers } from "./specialty.controller";

const router = Router();

router.post("/create-specialty", SpecialtyControllers.SpecialtyController);

export const SpecialtyRoute = router;
