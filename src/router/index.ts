import { Router } from "express";
import authRouter from "./auth.router";
import questRouter from "./quest.router";
import adminRouter from "./admin.router";
import submissionRouter from "./submission.router";
import { authGuard } from "../middlewares";

const router = Router();

router.use("/auth", authRouter);
router.use("/quests", questRouter);
router.use("/submissions", authGuard, submissionRouter);
router.use("/admin", authGuard, authGuard.roleGuard(["ADMIN"]), adminRouter);

export default router;
