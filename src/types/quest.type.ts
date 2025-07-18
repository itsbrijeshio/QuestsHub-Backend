// ================ Input Types ================ //
export type QuestProps = {
  title: string;
  description: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  tags: string[];
  isPublic: boolean;
};

export type QuestsQuery = {
  page: number;
  limit: number;
};
