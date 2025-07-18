import { Router } from "express";
import { QuestController } from "../controllers";
import { validateRequest } from "../middlewares";
import {
  createQuestSchema,
  updateQuestSchema,
} from "../validation/quest.schema";

const questController = new QuestController();

const router = Router();

const isValidQuestId = validateRequest.isValidId("questId", "params", "Quest");

router.post(
  "/quests",
  validateRequest(createQuestSchema),
  questController.handleCreateQuest
);
router.put(
  "/quests/:questId",
  isValidQuestId,
  validateRequest(updateQuestSchema),
  questController.handleUpdateQuest
);
router.delete(
  "/quests/:questId",
  isValidQuestId,
  questController.handleDeleteQuest
);

export default router;
