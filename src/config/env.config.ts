import { config } from "dotenv";

config({
  path: process.env.NODE_ENV === "production" ? ".env" : ".env.dev",
});

const env = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
};

export default env;
