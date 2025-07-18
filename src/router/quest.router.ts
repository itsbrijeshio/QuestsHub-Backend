import { Router } from "express";
import { QuestController } from "../controllers";
import { validateRequest } from "../middlewares";

const controllers = new QuestController();

const router = Router();

const isValidId = validateRequest.isValidId("questId", "params", "Quest");

router.get("/", controllers.handleGetQuests);
router.get("/:questId", isValidId, controllers.handleGetQuest);

export default router;
