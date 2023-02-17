import { Router } from "express";
import { createUsersController } from "../controllers/usersControllers";
import { createUserSchema } from "../schemas/userSchemas";
import { validatedDataMiddleware } from "../middlewares/validatedDataMiddleware";
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware";
import { verifyAdminMiddleware } from "../middlewares/verifyAdminMiddleware";

export const userRoutes: Router = Router();

userRoutes.post(
  "",
  validatedDataMiddleware(createUserSchema),
  createUsersController
);

userRoutes.get("", verifyTokenMiddleware, verifyAdminMiddleware);
