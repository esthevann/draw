// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { postsRouter } from "./posts";
import { userRouter } from "./user";
import { postsUnprotectedRouter } from "./posts-unprotected";
import { commentsRouter } from "./comments";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("post.", postsRouter)
  .merge("user.", userRouter)
  .merge("postsUnprotected.", postsUnprotectedRouter)
  .merge("comment.", commentsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
