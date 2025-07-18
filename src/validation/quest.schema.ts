import * as z from "zod/v4";

const title = z
  .string({
    error: "Title is required.",
  })
  .min(10, { message: "Title must be at least 10 characters" })
  .max(100, { message: "Title must be at most 100 characters" });

const description = z
  .string({
    error: "Description is required.",
  })
  .min(20, { message: "Description must be at least 20 characters" })
  .max(500, { message: "Description must be at most 500 characters" });

const difficulty = z
  .string({
    error: "Difficulty is required.",
  })
  .refine(
    (value) => {
      return ["EASY", "MEDIUM", "HARD"].includes(value);
    },
    {
      message: "Difficulty must be EASY, MEDIUM or HARD",
    }
  );

const tags = z
  .array(z.string(), { error: "Tags are required" })
  .min(1, "At least one tag is required")
  .max(10, "Maximum of 10 tags allowed");

const isPublic = z.boolean({ error: "Quest Public or Private" }).default(true);

const scoreWeight = z.number({ error: "Score is required" }).default(100);

export const createQuestSchema = z
  .object({
    title: title,
    description: description,
    difficulty: difficulty,
    tags: tags,
    scoreWeight: scoreWeight.optional(),
    isPublic: isPublic.optional(),
  })
  .strict();

export const updateQuestSchema = z
  .object({
    title: title.optional(),
    description: description.optional(),
    difficulty: difficulty.optional(),
    tags: tags.optional(),
    scoreWeight: scoreWeight.optional(),
    isPublic: isPublic.optional(),
  })
  .strict();
