import { Hono } from "hono";
import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import {
  createBlog,
  getAllBlog,
  getBlog,
  updateBlog,
} from "../controllers/blog";
export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    TOKEN_SECRET: string;
  };
}>();

blogRouter.post("/", createBlog);
blogRouter.put("/", updateBlog);
blogRouter.get("/:id", getBlog);
blogRouter.get("/bulk", getAllBlog);
