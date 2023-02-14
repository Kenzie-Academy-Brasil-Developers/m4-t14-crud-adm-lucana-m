import { Request, Response } from "express";
import { createUserService } from "../services/users/createUserService";

export const createUsersController = (
  request: Request,
  response: Response
): Response => {
  createUserService();

  return response.json({
    message: "Funcionando",
  });
};
