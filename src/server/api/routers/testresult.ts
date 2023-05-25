import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const resultRouter = createTRPCRouter({
  submitTest: protectedProcedure
    .input(
      z.object({
        testId: z.string(),
        answers: z.array(
          z.object({
            questionId: z.number(),
            answer: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const testId = input.testId;

      const test = await ctx.prisma.test.findUnique({
        where: { id: input.testId },
        include: {
          quesions: true,
        },
      });

      const correctAnswers = test?.quesions.map((question) => {
        return {
          questionId: question.id,
          answer: question.correctAnswer,
        };
      });

      const correctAnswersCount = input.answers.filter((answer) => {
        const correctAnswer = correctAnswers?.find((correctAnswer) => {
          return correctAnswer.questionId === answer.questionId;
        });

        return correctAnswer?.answer === answer.answer;
      }).length;

      const result = await ctx.prisma.testResult.create({
        data: {
          testId: testId,
          studentId: ctx.session.user.id,
          score: correctAnswersCount,
        },
      });

      return result;
    }),
});
