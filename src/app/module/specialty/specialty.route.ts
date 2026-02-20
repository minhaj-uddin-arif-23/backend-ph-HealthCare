import { Router } from "express";
import { SpecialtyControllers } from "./specialty.controller";
import { checkAuth } from "../../../middleware/checkAuth";
import { Role } from "@prisma/client";

const router = Router();

router.post(
  "/create-specialty",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  SpecialtyControllers.SpecialtyController,
);
router.get("/", SpecialtyControllers.ShowAllSpecialty);
router.delete(
  "/delete-specialty/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  SpecialtyControllers.DeleteSpecialty,
);
router.put(
  "/update-specialty/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  SpecialtyControllers.UpdateSpecialty,
);
export const SpecialtyRoute = router;
