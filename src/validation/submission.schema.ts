import * as z from "zod/v4";

const quest = z
  .string({
    error: "Quest ID is required.",
  })
  .length(24, "Quest ID must be 24 characters");

const githubRepo = z.string({ error: "Github repo is required." });

const comment = z
  .string({
    error: "Comment is required.",
  })
  .min(10, { message: "Comment must be at least 10 characters" })
  .max(500, { message: "Comment must be at most 500 characters" });

const status = z
  .string({
    error: "Status is required.",
  })
  .refine(
    (value) => {
      return ["PENDING", "APPROVED", "REJECTED"].includes(value);
    },
    {
      message: "Status must be PENDING, APPROVED or REJECTED",
    }
  );
const score = z
  .number({
    error: "Score is required.",
  })
  .min(0, { message: "Score must be at least 0" });

const feedback = z.string({
  error: "Feedback is required.",
});

export const createSubmissionSchema = z
  .object({
    quest,
    githubRepo,
    comment,
  })
  .strict();

export const updateSubmissionSchema = z
  .object({
    quest: quest.optional(),
    githubRepo: githubRepo.optional(),
    comment: githubRepo.optional(),
  })
  .strict();

export const adminUpdateSubmissionSchema = z
  .object({
    quest: quest.optional(),
    githubRepo: githubRepo.optional(),
    comment: comment.optional(),
    status: status.optional(),
    score: score.optional(),
    feedback: feedback.optional(),
  })
  .strict();
