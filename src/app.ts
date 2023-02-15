import express, { Application } from "express";
import { userRoutes } from "./routes/usersRoutes";

export const app: Application = express();
app.use(express.json());

app.use("/users", userRoutes);
