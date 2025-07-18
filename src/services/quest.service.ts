import { questModel } from "../models";
import { ApiError } from "../utils";
import { QuestProps, QuestsQuery } from "../types/quest.type";

class QuestService {
  private questModel = questModel;

  private sanitize(quest: any): any {
    const { __v, updatedAt, ...sanitizedQuest } = quest?.toJSON();
    return sanitizedQuest;
  }

  public async createQuest(createdBy: string, quest: QuestProps): Promise<any> {
    const newQuest = await this.questModel.create({ ...quest, createdBy });
    return this.sanitize(newQuest);
  }

  public async getQuests(query: QuestsQuery): Promise<any> {
    const skip = (query.page - 1) * query.limit;
    const quests = await this.questModel
      .find()
      .populate("createdBy", "name")
      .skip(skip)
      .limit(query.limit);
    return quests.map(this.sanitize);
  }

  public async getQuest(questId: string): Promise<any> {
    const quest = await this.questModel.findById(questId);
    if (!quest || !quest?._id) {
      throw new ApiError({
        type: "NotFoundError",
        code: 404,
        message: "Quest not found",
      });
    }

    return this.sanitize(quest);
  }

  public async updateQuest(questId: string, quest: QuestProps): Promise<any> {
    const updatedQuest = await this.questModel.findByIdAndUpdate(
      questId,
      quest,
      { new: true }
    );
    if (!updatedQuest) {
      throw new ApiError({
        type: "NotFoundError",
        code: 404,
        message: "Quest not found",
      });
    }

    return this.sanitize(updatedQuest);
  }

  public async deleteQuest(questId: string): Promise<{ message: string }> {
    const isDeleted = await this.questModel.findByIdAndDelete(questId);
    if (!isDeleted) {
      throw new ApiError({
        type: "NotFoundError",
        code: 404,
        message: "Quest not found",
      });
    }

    return { message: "Quest deleted successfully" };
  }
}

export default QuestService;
