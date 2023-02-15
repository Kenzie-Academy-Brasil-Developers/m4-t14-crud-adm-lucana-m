import { Request, Response } from "express";
import { IUserRequest } from "../interfaces/usersInterface";
import { createUserService } from "../services/users/createUserService";

export const createUsersController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const requestData: IUserRequest = request.body;

  const newUser = await createUserService(requestData);

  return response.status(201).json(newUser);
};
