import { createProtectedRouter } from "./protected-router";
import { z } from "zod";

export const commentsRouter = createProtectedRouter()
    .query("getCommentsByPost", {
        input: z.object({
            postId: z.string(),
        }),
        async resolve({ ctx, input }) {
            const comments = await ctx.prisma.post.findUnique({
                where: {
                    id: input.postId,
                },
                select: {
                    comments: {
                        select: {
                            id: true,
                            text: true,
                            User: {
                                select: {
                                    username: true,
                                    id: true,
                                    image: true,
                                }
                            }
                        }
                    },
                }
            })
            return comments;
        }
    })
    .mutation("createComment", {
        input: z.object({
            postId: z.string(),
            text: z.string().min(1),
        }),
        async resolve({ ctx, input }) {
            const id = await ctx.prisma.post.update({
                where: {
                    id: input.postId,
                },
                data: {
                    comments: {
                        create: {
                            text: input.text,
                            userId: ctx.session.user.id,
                        }
                    }
                },
                select: {
                    id: true,
                },

            })
            return id;
        }
    })