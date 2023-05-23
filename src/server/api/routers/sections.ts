import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";


export const sectionRouter = createTRPCRouter({
  getAllSections: publicProcedure
    .input(
      z.object({
        courseId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const sections = await ctx.prisma.section.findMany({
        where: { courseId: input.courseId },
      });

      return sections;
    }),

  createSection: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        courseId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const section = await ctx.prisma.section.create({
        data: {
          name: input.name,
          description: input.description,
          courseId: input.courseId,
        },
      });

      return section;
    }),

  addStudentsToSection: protectedProcedure
    .input(
      z.object({
        courseId: z.string(),
        sectionId: z.string(),
        studentIds: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const addStudents = await ctx.prisma.section.update({
        where: { id: input.sectionId },
        data: {
          students: {
            connect: input.studentIds.map((student) => ({ id: student })),
          },
        },
      });

      return addStudents;
    }),

  getStudentsInSection: protectedProcedure
    .input(
      z.object({
        sectionId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const section = await ctx.prisma.section.findUnique({
        where: { id: input.sectionId },
        include: {
          students: true,
        },
      });

      return section?.students;
    }),
});
