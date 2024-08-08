import express, { type Router } from "express";
import { UserHandler } from "../api/user_handler";

export function user_routes(user_handler: UserHandler): Router {
  const router = express.Router();

  router.post("/register", user_handler.register);

  return router;
}
