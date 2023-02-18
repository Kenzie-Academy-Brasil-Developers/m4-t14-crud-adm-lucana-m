import { Router } from "express";
import {
  createUsersController,
  listUsersController,
  userProfileController,
  updateUser,
} from "../controllers/usersControllers";
import { createUserSchema, updateUserSchema } from "../schemas/userSchemas";
import { validatedDataMiddleware } from "../middlewares/validatedDataMiddleware";
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware";
import { verifyAdminMiddleware } from "../middlewares/verifyAdminMiddleware";

export const userRoutes: Router = Router();

userRoutes.post(
  "",
  validatedDataMiddleware(createUserSchema),
  createUsersController
);

userRoutes.get(
  "",
  verifyTokenMiddleware,
  verifyAdminMiddleware,
  listUsersController
);

userRoutes.get("/profile", verifyTokenMiddleware, userProfileController);
userRoutes.patch(
  "/:id",
  verifyTokenMiddleware,
  validatedDataMiddleware(updateUserSchema),
  updateUser
);
