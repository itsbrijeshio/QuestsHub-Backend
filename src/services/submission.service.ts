import { submissionModel } from "../models";
import QuestService from "./quest.service";
import { ApiError } from "../utils";
import { SubmissionProps, SubmissionsQuery } from "../types/submission.type";

class SubmissionService {
  private submissionModel = submissionModel;
  private questService = new QuestService();

  private sanitize(submission: any): any {
    const { __v, createdAt, updatedAt, ...sanitizedSubmission } =
      submission?.toJSON();
    return sanitizedSubmission;
  }

  private async isSubmissionUnique(
    user: string,
    quest: string
  ): Promise<boolean> {
    const isSubmission = await this.submissionModel.findOne({ user, quest });
    if (isSubmission) {
      throw new ApiError({
        type: "ConflictError",
        code: 409,
        message: "Submission already exists",
      });
    }
    return !isSubmission;
  }

  public async createSubmission(
    userId: string,
    submission: SubmissionProps
  ): Promise<any> {
    await this.isSubmissionUnique(userId, submission.quest);

    submission.user = userId;
    await this.questService.isQuestExist(submission.quest);
    const newSubmission = await this.submissionModel.create(submission);
    return this.sanitize(newSubmission);
  }

  public async getSubmissions(
    user: string,
    query: SubmissionsQuery
  ): Promise<any> {
    const skip = (query.page - 1) * query.limit;
    const submissions = await this.submissionModel
      .find({ user })
      .skip(skip)
      .limit(query.limit);
    return submissions.map(this.sanitize);
  }

  public async getSubmission(submissionId: string): Promise<any> {
    const submission = await this.submissionModel.findById(submissionId);
    if (!submission || !submission?._id) {
      throw new ApiError({
        type: "NotFoundError",
        code: 404,
        message: "Submission not found",
      });
    }
    return this.sanitize(submission);
  }

  public async updateSubmission(
    submissionId: string,
    submission: SubmissionProps
  ): Promise<any> {
    const updatedSubmission = await this.submissionModel.findByIdAndUpdate(
      submissionId,
      submission,
      { new: true }
    );
    if (!updatedSubmission) {
      throw new ApiError({
        type: "NotFoundError",
        code: 404,
        message: "Submission not found",
      });
    }
    return this.sanitize(updatedSubmission);
  }

  public async deleteSubmission(
    submissionId: string
  ): Promise<{ message: string }> {
    const deletedSubmission = await this.submissionModel.findByIdAndDelete(
      submissionId
    );
    if (!deletedSubmission) {
      throw new ApiError({
        type: "NotFoundError",
        code: 404,
        message: "Submission not found",
      });
    }
    return { message: "Submission deleted successfully" };
  }
}

export default SubmissionService;
