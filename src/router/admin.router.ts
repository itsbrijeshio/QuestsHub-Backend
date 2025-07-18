import { Router } from "express";
import { QuestController, SubmissionController } from "../controllers";
import { validateRequest } from "../middlewares";
import {
  createQuestSchema,
  updateQuestSchema,
} from "../validation/quest.schema";
import { adminUpdateSubmissionSchema } from "../validation/submission.schema";

const questController = new QuestController();
const submissionController = new SubmissionController();

const router = Router();

const isValidQuestId = validateRequest.isValidId("questId", "params", "Quest");
const isValidSubmissionId = validateRequest.isValidId(
  "submissionId",
  "params",
  "Submission"
);

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

router.put(
  "/submissions/:submissionId",
  isValidSubmissionId,
  validateRequest(adminUpdateSubmissionSchema),
  submissionController.handleUpdateSubmission
);
router.delete(
  "/submissions/:submissionId",
  isValidSubmissionId,
  submissionController.handleDeleteSubmission
);

export default router;
