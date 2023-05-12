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

  createNewTest: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        courseId: z.string(),
        learningTargets: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.description.length <= 0) {
        const error: TRPCError = {
          name: "TRPCError",
          code: "BAD_REQUEST",
          message: '"Test Description" must be at least 4 characters',
        };

        console.log(error);

        return error;
      }

      if (input.name.length <= 0) {
        const error: TRPCError = {
          name: "TRPCError",
          code: "BAD_REQUEST",
          message: '"Test Name" must be at least 4 characters',
        };

        console.log(error);

        return error;
      }

      if (input.courseId.length <= 0) {
        const error: TRPCError = {
          name: "TRPCError",
          code: "BAD_REQUEST",
          message: "Must select a section(s)",
        };

        return error;
      }

      const test = await ctx.prisma.test.create({
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

  getTestById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const test = await ctx.prisma.test.findUnique({
        where: { id: input.id },
      });

      return test;
    }),
});
