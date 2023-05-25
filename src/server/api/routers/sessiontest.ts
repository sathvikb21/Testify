import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const sectionTest = createTRPCRouter({
  getAllTest: publicProcedure
    .input(
      z.object({
        testId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.sectionTest.findMany({
        where: { testId: input.testId },
      });
    }),

  createNewSectionTest: protectedProcedure
    .input(
      z.object({
        testId: z.string(),
        sectionId: z.string(),
        timeLimit: z.string(),
        students: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const minutes = parseInt(input.timeLimit);
      const testId = input.testId;
      const sectionId = input.sectionId;
      const students = input.students;

      const test = await ctx.prisma.sectionTest.create({
        data: {
          testId: testId,
          sectionId: sectionId,
          endTime: new Date(Date.now() + minutes * 60000),
          students: {
            connect: students.map((id) => ({ id })),
          },
        },
      });

      return test;
    }),

  getTestbyId: publicProcedure
    .input(
      z.object({
        testId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const test = await ctx.prisma.sectionTest.findUnique({
        where: { id: input.testId },
        include: {
          test: {
            include: {
              learningTargets: true,
              quesions: {
                include: {
                  answerChoices: true,
                },
              },
            },
          },
          students: true,
        },
      });

      return test;
    }),
});
