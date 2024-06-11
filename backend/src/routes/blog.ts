import { Hono } from "hono";
import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
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
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const header = c.req.header("authorization") || "";

  const token = header.split(" ")[1];
  console.log("header : ", header);
  console.log("token : ", token);

  const response = await verify(token, c.env.TOKEN_SECRET);
  console.log("response : ", response);
  if (response) {
    //@ts-ignore
    c.set("userId", response.id);
    await next();
  } else {
    c.status(403);
    return c.json({ error: "unauthorized" });
  }
});

blogRouter.post("/", createBlog);
blogRouter.put("/", updateBlog);
blogRouter.get("/bulk", getAllBlog);
blogRouter.get("/:id", getBlog);
