import axios from "axios";
import asyncHandler from "./asyncHandler";
import { ApiError } from "../utils";

const isValidGitHubRepoURL = (url: string) => {
  return /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/?$/.test(url);
};

const validateGithubURL = asyncHandler(async (req, res, next) => {
  const { githubRepo } = req.body;

  if (githubRepo && !isValidGitHubRepoURL(githubRepo)) {
    throw new ApiError({
      type: "NotFoundError",
      code: 404,
      message: "Invalid GitHub repository link",
    });
  }

  if (!githubRepo) {
    next();
  }

  try {
    await axios.get(githubRepo);
    next();
  } catch (error) {
    throw new ApiError({
      type: "NotFoundError",
      code: 404,
      message: "Invalid GitHub repository link",
    });
  }
});

export default validateGithubURL;
