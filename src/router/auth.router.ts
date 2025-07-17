import { Router } from "express";
import { AuthController } from "../controllers";
import { registerSchema, loginSchema } from "../validation/user.schema";
import { authGuard, validateRequest } from "../middlewares";
import passport from "../passport/strategy";

const controllers = new AuthController();

const router = Router();

router.post(
  "/register",
  validateRequest(registerSchema),
  controllers.handleRegister
);
router.post("/login", validateRequest(loginSchema), controllers.handleLogin);
router.get("/me", authGuard, controllers.handleGetMe);

// Github auth
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  controllers.handleGithub
);

export default router;
