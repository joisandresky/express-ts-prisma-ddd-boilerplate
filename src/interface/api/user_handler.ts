import type { NextFunction, Request, Response } from "express";
import { UserUsecase } from "../../application/usecase/user_uc";
import {
  fromUserToUserInfo,
  LoginRequest,
  RegisterUserRequest,
} from "../../domain/dto/user_dto";
import { WithUserRequest } from "../../domain/request/custom-express";

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

  me = async (req: WithUserRequest, res: Response, next: NextFunction) => {
    try {
      res.json({
        success: true,
        data: fromUserToUserInfo(req.user!),
      });
    } catch (err) {
      next(err);
    }
  };

  logout = async (req: WithUserRequest, res: Response, next: NextFunction) => {
    try {
      await this.uc.logout(req.user!.id);

      res.json({
        success: true,
      });
    } catch (err) {
      next(err);
    }
  };
}
