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
        answerOne: z.string(),
        answerTwo: z.string(),
        answerThree: z.string(),
        answerFour: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const question = await ctx.prisma.question.create({
        data: {
          question: input.question,
          correctAnswer: input.answer,
          learningTargetId: input.learningTargetId,
          answerChoices: {
            create: [
              { answer: input.answerOne },
              { answer: input.answerTwo },
              { answer: input.answerThree },
              { answer: input.answerFour },
            ],
          },
        },
      });

      return question;
    }),

  getQuestionsByLearningTargetId: publicProcedure
    .input(
      z.object({
        learningTargetId: z.string().optional(),
        learningTargets: z.array(z.string()).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const questions = await ctx.prisma.question.findMany({
        where: {
          OR: [
            { learningTargetId: input.learningTargetId },
            { learningTarget: { id: { in: input.learningTargets } } },
          ],
        },
      });

      return questions;
    }),
});
