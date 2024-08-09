import { User } from "@prisma/client";
import { Request } from "express";

export interface WithUserRequest extends Request {
  user?: User;
}
