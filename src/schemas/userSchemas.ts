import { hashSync } from "bcryptjs";
import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2).max(20),
  email: z.string().email(),
  password: z.string().transform((password) => {
    return hashSync(password, 12);
  }),
  admin: z.boolean(),
});

export const returnUserSchema = createUserSchema.extend({
  id: z.string().transform((str) => {
    return Number(str);
  }),
  active: z.boolean(),
});

export const returnWithoutPassword = returnUserSchema.omit({ password: true });
export const allUsersSchema = z.array(returnWithoutPassword);
