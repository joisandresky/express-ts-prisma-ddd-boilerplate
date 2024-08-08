import { v4 as uuidv4 } from "uuid";
import { User } from "@prisma/client";

export type RegisterUserRequest = {
  name: string;
  email: string;
};

export function fromRegisterUserToUser(req: RegisterUserRequest): User {
  return {
    id: uuidv4(),
    name: req.name,
    email: req.email,
  };
}
