// ================ Input Types ================ //
export type SubmissionProps = {
  quest: string;
  user: string;
  githubRepo: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  score: number;
  feedback: string;
};

export type SubmissionsQuery = {
  page: number;
  limit: number;
};
