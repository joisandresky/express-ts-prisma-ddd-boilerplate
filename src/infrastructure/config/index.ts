import dotenv from "dotenv";
import { app_config } from "./app_config";
dotenv.config();

export const config = {
  app: app_config,
  secret: process.env.SECRET_KEY,
  redis_url: process.env.REDIS_URL,
};

if (!config.secret) {
  throw new Error("SECRET_KEY is not defined");
}
