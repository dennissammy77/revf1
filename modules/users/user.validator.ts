import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().trim().email(),
  name: z.string().trim().min(1).max(100).optional(),
  password: z.string().min(8).max(128),
  phone: z.string().min(10).max(10),
  role: z.string().default("user"),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;