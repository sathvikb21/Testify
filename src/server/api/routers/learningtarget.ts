import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const learningTargetRouter = createTRPCRouter({
  getAllLearningTargets: publicProcedure
    .input(z.object({ courseId: z.string() }))
    .query(async ({ ctx, input }) => {
      const learningTarget = await ctx.prisma.learningTarget.findMany({
        where: { courseId: input.courseId },
      });

      return learningTarget;
    }),

  createLearningTarget: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        courseId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const learningTarget = await ctx.prisma.learningTarget.create({
        data: {
          name: input.name,
          description: input.description,
          courseId: input.courseId,
        },
      });

      return learningTarget;
    }),
});
