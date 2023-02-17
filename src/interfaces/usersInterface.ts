import { QueryResult } from "pg";
import { z } from "zod";
import {
  createUserSchema,
  returnUserSchema,
  allUsersSchema,
} from "../schemas/userSchemas";

export type IUserRequest = z.infer<typeof createUserSchema>;
export type IUser = z.infer<typeof returnUserSchema>;

export type UserWithPassword = QueryResult<IUser>;
export type UserOmitPassword = Omit<IUser, "password">;
export type IUserResult = QueryResult<UserOmitPassword>;
export type allUsersReturn = z.infer<typeof allUsersSchema>;
