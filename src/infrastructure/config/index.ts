import dotenv from "dotenv";
import { app_config } from "./app_config";
dotenv.config();

export const config = {
  app: app_config,
};
