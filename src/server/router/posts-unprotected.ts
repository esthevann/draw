import { createRouter } from "./context";
import { z } from "zod";

export const postsUnprotectedRouter = createRouter()
    .query("getPostById", {
        input: z.object({
            postId: z.string(),
        }),
        async resolve({ ctx, input }) {
            const post = await ctx.prisma.post.findUnique({
                where: {
                    id: input.postId,
                },
                include: {
                    User: true
                }
            })
            return post;
        }
    })
