import { Request, Response } from "express";
import { loginService } from "../services/login/loginService";

export const loginController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const token = await loginService(request.body);

  return response.json({
    token: token,
  });
};
