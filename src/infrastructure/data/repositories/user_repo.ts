import { PrismaClient, User } from "@prisma/client";
import { UserRepository } from "../../../domain/repositories/user_repo";
import { RegisterUserRequest } from "../../../domain/dto/user_dto";

export class PgUserRepository implements UserRepository {
  constructor(private db: PrismaClient) {}

  async create(user: User): Promise<User> {
    return await this.db.user.create({ data: user });
  }

  async is_exist(email: string): Promise<boolean> {
    const user = await this.db.user.count({
      where: {
        email: email,
      },
    });

    return user > 0;
  }
}
