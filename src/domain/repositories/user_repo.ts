import { User } from "@prisma/client";

export interface UserRepository {
  create(user: User): Promise<User>;
  find_by_email(email: string): Promise<User | null>;
  is_exist(email: string): Promise<boolean>;
}
