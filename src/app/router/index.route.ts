import { Router } from "express";
import { SpecialtyRoute } from "../module/specialty/specialty.route";
import { AuthRouter } from "../module/auth/auth.route";
import { UserRoute } from "../user/user.route";

const router = Router();
router.use("/auth", AuthRouter);
router.use("/specialtys", SpecialtyRoute);
router.use("/doctors", UserRoute);

export const IndexRoute = router;
