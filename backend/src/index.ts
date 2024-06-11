import { Hono } from "hono";
import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { login, signup } from "./controllers/user";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    TOKEN_SECRET: string;
  };
}>();

app.use("/api/va/blog/*", async (c, next) => {
  const header = c.req.header("authorization") || "";

  const token = header.split(" ")[1];
  console.log("header : ", header);
  console.log("token : ", token);

  const response = await verify(token, c.env.TOKEN_SECRET);
  if (response.id) {
    next();
  } else {
    c.status(403);
    return c.json({ error: "unauthorized" });
  }
});

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

app.get("/", (c) => {
  return c.text("hello");
});

export default app;
