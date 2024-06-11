import bcrypt from "bcryptjs";

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
  try {
    const body = await c.req.json();

    const secret = c.env.TOKEN_SECRET;
    const saultround = 10;
    const hashedpassword = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedpassword,
        name: body.name,
      },
    });
    const payload = {
      id: user.id,
      exp: Math.floor(Date.now() / 1000) + 60 * 15,
    };

    const token = await sign(payload, secret);

    return c.json({ jwt: token });
  } catch (error) {
    c.status(500);
    c.json({
      error: "error while creating user ",
    });
  }
};

export const login = async (c: any) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    });

    const body = await c.req.json();
    // console.log(body);

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "user not found" });
    }
    const isValid = await bcrypt.compare(body.password, user.password);
    if (!isValid) {
      c.status(401);

      return c.json({ error: "invalid user or password" });
    }

    const jwt = await sign({ id: user.id }, c.env.TOKEN_SECRET);

    return c.json({ jwt: jwt });
  } catch (error) {
    c.status(500);
    c.json({ error: "error while login" });
  }
};
