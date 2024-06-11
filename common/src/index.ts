import z from "zod";

export const signupInputes = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(10),
  name: z.string().optional(),
});

export const loginInputes = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(10),
});

//blog inpput syntax

export const blogInputes = z.object({
  title: z.string(),
  content: z.string(),
});

//update blog inputes

export const updateBlogInputes = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});

export type SignupInputes = z.infer<typeof signupInputes>;
export type LoginInputes = z.infer<typeof loginInputes>;
export type BlogInputes = z.infer<typeof blogInputes>;
export type UpdateBlogInputes = z.infer<typeof updateBlogInputes>;
