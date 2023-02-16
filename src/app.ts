import "express-async-errors";
import express, { Application } from "express";
import { userRoutes } from "./routes/usersRoutes";
import { handleErrors } from "./errors";
import { loginRoutes } from "./routes/loginRoutes";

export const app: Application = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/login", loginRoutes);

app.use(handleErrors);
