import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

export const verifyAdminMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authenticatedUser = request.user;

  if (!authenticatedUser.admin) {
    throw new AppError("Insufficient Permission", 403);
  }

  return next();
};
