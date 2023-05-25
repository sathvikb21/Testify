import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { api } from "~/utils/api";

export const testsRouter = createTRPCRouter({
  getAllTest: publicProcedure
    .input(
      z.object({
        courseId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const tests = await ctx.prisma.test.findMany({
        where: {
          teacherId: ctx.session?.user.id as string,
          courseId: input.courseId,
        },
      });

      return tests;
    }),

  createNewTest: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        courseId: z.string(),
        learningTargets: z.array(z.string()),
        questions: z.array(z.number()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const learningTargets = input.learningTargets;

      const test = await ctx.prisma.test.create({
        data: {
          name: input.name,
          description: input.description,
          courseId: input.courseId,
          teacherId: ctx.session.user.id,
          learningTargets: {
            connect: learningTargets.map((learningTarget) => {
              return { id: learningTarget };
            }),
          },
          quesions: {
            connect: input.questions.map((question) => {
              return { id: question };
            }),
          },
        },
      });

      return test;
    }),

  getTestById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const test = await ctx.prisma.test.findUnique({
        where: { id: input.id },
        include: {
          learningTargets: {
            include: {
              questions: true,
            },
          },
          quesions: true,
        },
      });

      return test;
    }),
});
