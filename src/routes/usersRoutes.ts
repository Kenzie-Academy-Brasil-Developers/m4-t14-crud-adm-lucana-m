import { Router } from "express";
import { createUsersController } from "../controllers/usersControllers";
import { createUserSchema } from "../schemas/userSchemas";
import { validatedDataMiddleware } from "../middlewares/validatedDataMiddleware";

export const userRoutes: Router = Router();

userRoutes.post(
  "",
  validatedDataMiddleware(createUserSchema),
  createUsersController
);
