import { asyncHandler } from "../middlewares";
import { QuestService } from "../services";
import { response } from "../utils";
import { AuthRequest } from "../types/error.type";
import { Request, Response } from "express";

class QuestController extends QuestService {
  constructor() {
    super();
  }

  handleCreateQuest = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { _id } = req.auth;
    const quest = await this.createQuest(_id, req.body);
    response(res, 201, { quest });
  });

  handleGetQuests = asyncHandler(async (req: Request, res: Response) => {
    const queries: any = req.query;
    const page = parseInt(queries?.page) || 1;
    const limit = parseInt(queries?.limit) || 30;
    const quests = await this.getQuests({ page, limit });
    response(res, 200, { quests });
  });

  handleGetQuest = asyncHandler(async (req: Request, res: Response) => {
    const { questId } = req.params;
    const quest = await this.getQuest(questId);
    response(res, 200, { quest });
  });

  handleUpdateQuest = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { questId } = req.params;
    const quest = await this.updateQuest(questId, req.body);
    response(res, 200, { quest });
  });

  handleDeleteQuest = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { questId } = req.params;
    const { message } = await this.deleteQuest(questId);
    response(res, 200, { message });
  });
}

export default QuestController;
