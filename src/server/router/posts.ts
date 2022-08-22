import { createProtectedRouter } from "./protected-router";
import { z } from "zod";

export const postsRouter = createProtectedRouter()
    .mutation("createPost", {
        input: z.object({
            title: z.string().nullable(),
            imgSrc: z.string(),
        }),
        async resolve({ ctx, input }) {
            const id = ctx.prisma.user.update({
                where: {
                    id: ctx.session.user.id,
                },
                data: {
                    posts: {
                        create: {
                            title: input.title || `NewImage-${Date.now()}`,
                            imgSrc: input.imgSrc
                        }
                    }
                },
                select: {
                    id: true,
                }
            })
            return id;
        }
    })
    .query("getPostsByUser", {
        input: z.object({
            userId: z.string(),
        }),
        async resolve({ ctx, input }) {
            const posts = await ctx.prisma.user.findUnique({
                where: {
                    id: input.userId,
                },
                select: {
                    
                    posts: true,
                }
            })
            return posts;
        }
    })

