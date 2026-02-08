import { Router } from "express";
import { SpecialtyControllers } from "./specialty.controller";

const router = Router();

router.post("/create-specialty", SpecialtyControllers.SpecialtyController);
router.get("/", SpecialtyControllers.ShowAllSpecialty);
router.delete("/delete-specialty/:id", SpecialtyControllers.DeleteSpecialty);
router.put("/update-specialty/:id", SpecialtyControllers.UpdateSpecialty);
export const SpecialtyRoute = router;
