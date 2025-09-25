import dotenv from "dotenv";
dotenv.config();

export const ENV_VARS = {
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  NODE_ENV: process.env.NODE_ENV
};
