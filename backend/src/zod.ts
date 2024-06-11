import z from "zod";

export const signupInputes = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(10),
  name: z.string().optional(),
});

//type inference in zod

export type SignupInputes = z.infer<typeof signupInputes>;
