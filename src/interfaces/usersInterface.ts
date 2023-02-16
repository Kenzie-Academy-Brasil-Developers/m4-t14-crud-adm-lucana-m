import { QueryResult } from "pg";
import { z } from "zod";
import {
  createUserSchema,
  returnUserSchema,
  returnWithoutPassword,
} from "../schemas/userSchemas";

export type IUserRequest = z.infer<typeof createUserSchema>;
export type IUser = z.infer<typeof returnUserSchema>;

export type UserOmitPassword = Omit<IUser, "password">;
export type IUserResult = QueryResult<UserOmitPassword>;
