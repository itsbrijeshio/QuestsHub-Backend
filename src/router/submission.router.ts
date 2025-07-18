import { Router } from "express";
import { SubmissionController } from "../controllers";
import {
  createSubmissionSchema,
  updateSubmissionSchema,
} from "../validation/submission.schema";
import { validateRequest, validateGithubURL } from "../middlewares";

const controllers = new SubmissionController();

const router = Router();

const isValidId = validateRequest.isValidId(
  "submissionId",
  "params",
  "Submission"
);

router.get("/", controllers.handleGetSubmissions);
router.get("/:submissionId", isValidId, controllers.handleGetSubmission);
router.post(
  "/",
  validateRequest(createSubmissionSchema),
  validateGithubURL,
  controllers.handleCreateSubmission
);
router.put(
  "/:submissionId",
  isValidId,
  validateRequest(updateSubmissionSchema),
  validateGithubURL,
  controllers.handleUpdateSubmission
);
router.delete("/:submissionId", isValidId, controllers.handleDeleteSubmission);

export default router;
