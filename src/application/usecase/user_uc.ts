import winston from "winston";
import {
  fromRegisterUserToUser,
  RegisterUserRequest,
} from "../../domain/dto/user_dto";
import { UserRepository } from "../../domain/repositories/user_repo";
import { ResponseError } from "../../infrastructure/errors/response_error";
import { UserValidation } from "../validation/user_validation";
import { Validator } from "../validation/validator";

export class UserUsecase {
  constructor(
    private logger: winston.Logger,
    private user_repo: UserRepository,
  ) {}

  async register_user(req: RegisterUserRequest): Promise<string> {
    const registerReq = Validator.validate(req, UserValidation.REGISTER);

    const is_exist = await this.user_repo.is_exist(registerReq.email);

    if (is_exist) {
      throw new ResponseError(400, "User already exists");
    }

    const user = await this.user_repo.create(
      fromRegisterUserToUser(registerReq),
    );

    this.logger.info(`User ${user.email} created`);

    return user.id;
  }
}
