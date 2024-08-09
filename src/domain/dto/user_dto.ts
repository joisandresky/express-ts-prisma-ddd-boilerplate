import { v4 as uuidv4 } from "uuid";
import { User } from "@prisma/client";

// Register
//
export type RegisterUserRequest = {
  name: string;
  email: string;
  password: string;
};

export function fromRegisterUserToUser(req: RegisterUserRequest): User {
  return {
    id: uuidv4(),
    name: req.name,
    email: req.email,
    password: req.password,
  };
}

// Login
//
export type LoginRequest = {
  email: string;
  password: string;
};

// UserInfo
//
export type UserInfo = {
  id: string;
  name: string;
  email: string;
};

export function fromUserToUserInfo(user: User): UserInfo {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}
