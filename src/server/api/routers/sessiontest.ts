import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { type TRPCError } from "@trpc/server";

export const testsRouter = createTRPCRouter({
  getAllTest: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.test.findMany({
      where: { teacherId: ctx.session?.user.id as string },
    });
  }),

  createNewSectionTest: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        courseId: z.string(),
        learningTargets: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const sectionTest = await ctx.prisma.test.create({
        data: {
          name: input.name,
          description: input.description,
          courseId: input.courseId,
          teacherId: ctx.session.user.id,
          learningTargets: {
            connect: input.learningTargets.map((learningTarget) => {
              return { id: learningTarget };
            }),
          },
        },
      });

      return test;
    }),
});
