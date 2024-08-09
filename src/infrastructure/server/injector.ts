import type { Express } from "express";
import { PgUserRepository } from "../data/repositories/user_repo";
import { db } from "../data/db";
import { UserUsecase } from "../../application/usecase/user_uc";
import { logger } from "../logger";
import { UserHandler } from "../../interface/api/user_handler";
import {
  public_user_routes,
  user_routes,
} from "../../interface/routes/user_routes";

export const injectModules = (app: Express) => {
  // repositories
  //
  //
  const user_repo = new PgUserRepository(db);

  // usecases
  //
  //
  const user_uc = new UserUsecase(logger, user_repo);

  // api handlers
  //
  //
  const user_handler = new UserHandler(user_uc);

  // routes registration
  // public users api route
  app.use("/public/v1/users", public_user_routes(user_handler));
  // private users api route
  app.use("/api/v1/users", user_routes(user_handler));
};
