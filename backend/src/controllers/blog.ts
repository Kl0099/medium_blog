import { Hono, Context } from "hono";
import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { blogInputes, updateBlogInputes } from "common-zod-module";
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    TOKEN_SECRET: string;
  };
}>();

export const createBlog = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = await c.req.json();
    const { success } = blogInputes.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({ error: "Invalid Inputes " });
    }
    const userId = c.get("userId");
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });
    c.status(200);
    return c.json({
      message: "Blog successfully created",
      blogid: blog.id,
    });
  } catch (error) {
    c.status(500);
    return c.json({
      error: "error while creating blog",
    });
  }
};

export const updateBlog = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = await c.req.json();
    // console.log(body);
    const { success } = updateBlogInputes.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({ error: "Invalid Inputes " });
    }
    const blog = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    c.status(200);
    return c.json({
      blog,
    });
  } catch (error) {
    c.status(500);
    return c.json({
      error: "error while updating blog",
    });
  }
};

export const deleteBlog = async (c: Context) => {};

export const getAllBlog = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blog = await prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    c.status(200);
    return c.json({
      blog: blog,
    });
  } catch (error) {
    c.status(500);
    return c.json({
      error: "error while dispatching blog",
    });
  }
};

export const getBlog = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = await c.req.json();
    console.log("body: " + body);
    const blog = await prisma.post.findFirst({
      where: {
        id: body.id,
      },
    });
    if (!blog) {
      c.status(404);
      return c.json({
        error: "blog not found",
      });
    }
    c.status(200);
    return c.json({
      blog: blog,
    });
  } catch (error) {
    c.status(500);
    return c.json({
      error: "error while get blog",
    });
  }
};
