import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();
router.post("/register", AuthController.RegisterController);
router.post("/login", AuthController.LoginController);

export const AuthRouter = router;
