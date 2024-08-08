import { User } from "@prisma/client";

export interface UserRepository {
  create(user: User): Promise<User>;
  is_exist(email: string): Promise<boolean>;
}
