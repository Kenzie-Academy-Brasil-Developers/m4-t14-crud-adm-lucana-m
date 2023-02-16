import { Router } from "express";
import { validatedDataMiddleware } from "../middlewares/validatedDataMiddleware";
import { loginController } from "../controllers/loginControllers";
import { loginSchema } from "../schemas/loginSchemas";

export const loginRoutes: Router = Router();

loginRoutes.post("", validatedDataMiddleware(loginSchema), loginController);
