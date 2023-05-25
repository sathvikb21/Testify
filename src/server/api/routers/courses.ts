import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const coursesRouter = createTRPCRouter({
  getAllCourses: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.course.findMany({
      where: { teacherId: ctx.session?.user.id as string },
    });
  }),

  createNewCourse: protectedProcedure
    .input(z.object({
      name: z.string(),
      description: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const course = await ctx.prisma.course.create({
        data: {
          name: input.name,
          description: input.description,
          teacherId: ctx.session?.user.id,
        },
      });

      return course;
    }),
  
  
});
