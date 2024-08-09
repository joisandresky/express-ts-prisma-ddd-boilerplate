import type { NextFunction, Request, Response } from "express";
import { UserUsecase } from "../../application/usecase/user_uc";
import { LoginRequest, RegisterUserRequest } from "../../domain/dto/user_dto";

export class UserHandler {
  constructor(private uc: UserUsecase) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as RegisterUserRequest;
      const id = await this.uc.register_user(body);

      res.json({
        success: true,
        data: id,
      });
    } catch (err) {
      next(err);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as LoginRequest;
      const token = await this.uc.authenticate(body);

      res.json({
        success: true,
        data: token,
      });
    } catch (err) {
      next(err);
    }
  };
}
