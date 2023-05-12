import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const questionRouter = createTRPCRouter({
  // getAllQuestions: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.course.findMany({
  //     where: { teacherId: ctx.session?.user.id as string },
  //   });
  // }),

  createNewQuestion: protectedProcedure
    .input(
      z.object({
        question: z.string(),
        answer: z.string(),
        learningTargetId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const question = await ctx.prisma.question.create({
        data: {
          question: input.question,
          answer: input.answer,
          learningTargetId: input.learningTargetId,
        },
      });

      return question;
    }),
});
