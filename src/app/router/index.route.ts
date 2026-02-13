import { Router } from "express";
import { SpecialtyRoute } from "../module/specialty/specialty.route";
import { AuthRouter } from "../module/auth/auth.route";

const router = Router();
router.use("/auth", AuthRouter);
router.use("/specialtys", SpecialtyRoute);

export const IndexRoute = router;
