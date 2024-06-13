import { Hono } from "hono";
import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { login, signup } from "../controllers/user";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    TOKEN_SECRET: string;
  };
}>();

userRouter.post("/signup", signup);
userRouter.post("/signin", login);
