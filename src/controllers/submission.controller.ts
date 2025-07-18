import { Response } from "express";
import { asyncHandler } from "../middlewares";
import { SubmissionService } from "../services";
import { response } from "../utils";
import { AuthRequest } from "../types/error.type";

class SubmissionController extends SubmissionService {
  constructor() {
    super();
  }

  handleCreateSubmission = asyncHandler(
    async (req: AuthRequest, res: Response) => {
      const { _id } = req.auth;
      const submission = await this.createSubmission(_id, req.body);
      response(res, 201, { submission });
    }
  );

  handleGetSubmissions = asyncHandler(
    async (req: AuthRequest, res: Response) => {
      const { _id } = req.auth;
      const submissions = await this.getSubmissions(_id, req.query);
      response(res, 200, { submissions });
    }
  );

  handleGetSubmission = asyncHandler(
    async (req: AuthRequest, res: Response) => {
      const { submissionId } = req.params;
      const submission = await this.getSubmission(submissionId);
      response(res, 200, { submission });
    }
  );

  handleUpdateSubmission = asyncHandler(
    async (req: AuthRequest, res: Response) => {
      const { submissionId } = req.params;
      const submission = await this.updateSubmission(submissionId, req.body);
      response(res, 200, { submission });
    }
  );

  handleDeleteSubmission = asyncHandler(
    async (req: AuthRequest, res: Response) => {
      const { submissionId } = req.params;
      const { message } = await this.deleteSubmission(submissionId);
      response(res, 200, { message });
    }
  );
}

export default SubmissionController;
