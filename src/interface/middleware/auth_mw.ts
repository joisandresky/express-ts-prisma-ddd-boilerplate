import { NextFunction, Response } from "express";
import { WithUserRequest } from "../../domain/request/custom-express";
import { redis_client } from "../../infrastructure/data/redis";
import { verify_token } from "../../infrastructure/tokenizer/jwt";
import { config } from "../../infrastructure/config";
import { db } from "../../infrastructure/data/db";
import { User } from "@prisma/client";

export const auth_middleware = async (
  req: WithUserRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.get("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({
        message: "Unauthorized",
        errors: "Authorization Token is missing",
      })
      .end();
  }

  const payload = verify_token(token, config.secret!);

  if (!payload) {
    return res
      .status(401)
      .json({
        message: "Unauthorized",
        errors: "Invalid Authorization Token",
      })
      .end();
  }

  const token_key = `USER_TOKEN_${payload.user_id}`;

  const exist = await redis_client.exists(token_key);

  if (!exist) {
    return res
      .status(401)
      .json({
        message: "Unauthorized",
        errors: "Invalid Authorization Token",
      })
      .end();
  }

  // check exist user in redis
  // if not exist find in db
  //
  const user_key = `USER_${payload.user_id}`;
  const user_redis = await redis_client.get(user_key);

  if (!user_redis) {
    const user = await db.user.findUnique({
      where: {
        id: payload.user_id,
      },
    });

    if (!user) {
      return res
        .status(401)
        .json({
          message: "Unauthorized",
          errors: "Invalid Authorization Token",
        })
        .end();
    }

    await redis_client.set(user_key, JSON.stringify(user));

    req.user = user;
    return next();
  }

  req.user = JSON.parse(user_redis) as User;
  next();
};
