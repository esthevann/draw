import { createProtectedRouter } from "./protected-router";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export const userRouter = createProtectedRouter()
    .mutation("addUsername", {
        input: z.object({
            username: z.string(),
        }),
        async resolve({ ctx, input }) {
            if (/\s/.test(input.username) || input.username.length < 3) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Username must be at least 3 characters and cannot contain spaces.",
                });
            }

            try {
                const user = await ctx.prisma.user.update({
                    where: {
                        id: ctx.session.user.id,
                    },
                    data: {
                        username: input.username,
                        fullyRegistered: true,
                    },
                    select: {
                        fullyRegistered: true,
                    }
                })
                return user;
            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') throw new TRPCError({ code: "CONFLICT" });
                }
                
                throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
            }
        }
    })