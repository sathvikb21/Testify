import { createTRPCRouter } from "~/server/api/trpc";
import { coursesRouter } from "~/server/api/routers/courses";
import { usersRouter } from "~/server/api/routers/users";
import { learningTargetRouter } from "~/server/api/routers/learningtarget";
import { sectionRouter } from "~/server/api/routers/sections";
import { questionRouter } from "~/server/api/routers/question";
import { testsRouter } from "~/server/api/routers/test";
import { sectionTest } from "~/server/api/routers/sessiontest";
import { resultRouter } from "~/server/api/routers/testresult";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: usersRouter,
  courses: coursesRouter,
  learningTarget: learningTargetRouter,
  section: sectionRouter,
  question: questionRouter,
  test: testsRouter,
  sectionTest: sectionTest,
  testResults: resultRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
