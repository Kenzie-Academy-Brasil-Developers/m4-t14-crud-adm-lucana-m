import { Request, Response } from "express";
import { IUserRequest } from "../interfaces/usersInterface";
import { createUserService } from "../services/users/createUserService";
import { listUsersService } from "../services/users/listUsersService";
import { userProfileService } from "../services/users/userProfileService";
import { updateUserService } from "../services/users/updateUserService";
import { softDeleteUserService } from "../services/users/softDeleteUserService";

export const createUsersController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const requestData: IUserRequest = request.body;

  const newUser = await createUserService(requestData);

  return response.status(201).json(newUser);
};

export const listUsersController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const users = await listUsersService();

  return response.json(users);
};

export const userProfileController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userProfile = await userProfileService(request.user.id);

  return response.status(200).json(userProfile);
};

export const updateUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userData = request.body;
  const user = await updateUserService(request.params.id, userData);

  return response.status(200).json(user);
};

export const softDeleteUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  await softDeleteUserService(request.params.id);

  return response.status(204).send();
};
