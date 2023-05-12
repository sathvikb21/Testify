import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const usersRouter = createTRPCRouter({
  getUser: publicProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { id: ctx.session?.user.id as string },
    });

    return user;
  }),

  getAllStudents: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
    });

    if (user?.UserType !== "teacher") {
      throw new Error("You are not an teacher");
    }

    const users = await ctx.prisma.user.findMany({
      where: { UserType: "student" },
    });
    return users;
  }),

  getUserType: publicProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { id: ctx.session?.user.id as string },
    });

    return user?.UserType;
  }),
});
