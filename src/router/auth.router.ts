import { Router } from "express";
import { AuthController } from "../controllers";
import { registerSchema, loginSchema } from "../validation/user.schema";
import { authGuard, validateRequest } from "../middlewares";

const controllers = new AuthController();

const router = Router();

router.post(
  "/register",
  validateRequest(registerSchema),
  controllers.handleRegister
);
router.post("/login", validateRequest(loginSchema), controllers.handleLogin);
router.get("/me", authGuard, controllers.handleGetMe);

export default router;
