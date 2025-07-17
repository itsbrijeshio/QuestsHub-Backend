import { config } from "dotenv";

config({
  path: process.env.NODE_ENV === "production" ? ".env" : ".env.dev",
});

const env = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as string,
  FRONTEND_URL: process.env.FRONTEND_URL as string,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID as string,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET as string,
  GITHUB_CB_URL: process.env.GITHUB_CB_URL as string,
};

export default env;
