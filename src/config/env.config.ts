import { config } from "dotenv";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env"
    : process.env.NODE_ENV === "test"
    ? ".env.test"
    : ".env.dev";

config({ path: envFile, quiet: true });

const env = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as string,
  FRONTEND_URL: process.env.FRONTEND_URL as string,
};

export default env;
