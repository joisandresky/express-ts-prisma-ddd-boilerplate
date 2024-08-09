import express, { type Router } from "express";
import { UserHandler } from "../api/user_handler";
import { auth_middleware } from "../middleware/auth_mw";

export function public_user_routes(user_handler: UserHandler): Router {
  const router = express.Router();

  router.post("/register", user_handler.register);
  router.post("/login", user_handler.login);

  return router;
}

export function user_routes(user_handler: UserHandler): Router {
  const router = express.Router();
  router.use(auth_middleware);

  router.get("/me", user_handler.me);
  router.delete("/logout", user_handler.logout);

  return router;
}
