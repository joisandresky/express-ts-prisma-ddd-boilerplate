import winston from "winston";
import {
  fromRegisterUserToUser,
  LoginRequest,
  RegisterUserRequest,
} from "../../domain/dto/user_dto";
import { UserRepository } from "../../domain/repositories/user_repo";
import { ResponseError } from "../../infrastructure/errors/response_error";
import { UserValidation } from "../validation/user_validation";
import { Validator } from "../validation/validator";
import * as argon2 from "argon2";
import { create_token } from "../../infrastructure/tokenizer/jwt";
import { config } from "../../infrastructure/config";
import { redis_client } from "../../infrastructure/data/redis";

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

    registerReq.password = await argon2.hash(registerReq.password);

    const user = await this.user_repo.create(
      fromRegisterUserToUser(registerReq),
    );

    this.logger.info(`User ${user.email} created`);

    return user.id;
  }

  async authenticate(req: LoginRequest): Promise<string> {
    const loginReq = Validator.validate(req, UserValidation.LOGIN);

    const user = await this.user_repo.find_by_email(loginReq.email);

    if (!user) {
      throw new ResponseError(401, "There is no user with this email");
    }

    if (!(await argon2.verify(user.password, loginReq.password))) {
      throw new ResponseError(401, "your credentials are wrong");
    }

    // check if current user already have access token
    // return old token instead
    const token_key = `USER_TOKEN_${user.id}`;
    const existing_token = await redis_client.get(token_key);
    if (existing_token) {
      return existing_token;
    }

    // token will have 7 days expiration
    // user data will only have 1 hour expiration so it will refresh new user data if expired via auth mw
    const in_a_week = 60 * 60 * 24 * 7;
    const token = create_token(user.id, config.secret!, in_a_week);

    await redis_client.set(`USER_TOKEN_${user.id}`, token, "EX", in_a_week);
    await redis_client.set(`USER_${user.id}`, JSON.stringify(user), "EX", 3600);

    return token;
  }

  async logout(id: string) {
    await redis_client.del(`USER_TOKEN_${id}`);
    await redis_client.del(`USER_${id}`);
  }
}
