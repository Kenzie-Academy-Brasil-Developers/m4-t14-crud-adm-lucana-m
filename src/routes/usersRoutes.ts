import { Router } from "express";
import { createUsersController } from "../controllers/usersControllers";

export const userRoutes: Router = Router();

userRoutes.post("", createUsersController);
