import { Router } from "express";
import {
  createUsersController,
  listUsersController,
  userProfileController,
  updateUserController,
  softDeleteUserController,
  recoverUserController,
} from "../controllers/usersControllers";
import { createUserSchema, updateUserSchema } from "../schemas/userSchemas";
import { validatedDataMiddleware } from "../middlewares/validatedDataMiddleware";
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware";
import { verifyAdminMiddleware } from "../middlewares/verifyAdminMiddleware";
import { verifyUserExistsMiddleware } from "../middlewares/verifyUserExistsMiddleware";

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
  verifyUserExistsMiddleware,
  verifyTokenMiddleware,
  validatedDataMiddleware(updateUserSchema),
  updateUserController
);
userRoutes.delete(
  "/:id",
  verifyUserExistsMiddleware,
  verifyTokenMiddleware,
  softDeleteUserController
);
userRoutes.put(
  "/:id/recover",
  verifyUserExistsMiddleware,
  verifyTokenMiddleware,
  verifyAdminMiddleware,
  recoverUserController
);
