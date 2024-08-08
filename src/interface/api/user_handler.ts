import type { NextFunction, Request, Response } from "express";
import { UserUsecase } from "../../application/usecase/user_uc";
import { RegisterUserRequest } from "../../domain/dto/user_dto";

export class UserHandler {
  constructor(private uc: UserUsecase) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as RegisterUserRequest;
      const id = await this.uc.register_user(body);

      res.json({ id });
    } catch (err) {
      next(err);
    }
  };
}
