import { loginSchema } from "../schemas/loginSchemas";
import { z } from "zod";

export type LoginRequest = z.infer<typeof loginSchema>;
