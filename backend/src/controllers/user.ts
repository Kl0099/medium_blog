import { Hono } from "hono";
import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    TOKEN_SECRET: string;
  };
}>();

export const signup = async (c: any) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const secret = c.env.TOKEN_SECRET;

  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
      name: body.name,
    },
  });
  const payload = { id: user.id, exp: Math.floor(Date.now() / 1000) + 60 * 15 };

  const token = await sign(payload, secret);

  return c.json({ jwt: token });
};

export const login = async (c: any) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  });

  const body = await c.req.json();
  // console.log(body);

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ error: "user not found" });
  }

  if (user.password !== body.password) {
    c.status(401);

    return c.json({ error: "invalid user or password" });
  }

  const jwt = await sign({ id: user.id }, c.env.TOKEN_SECRET);

  return c.json({ jwt: jwt });
};
