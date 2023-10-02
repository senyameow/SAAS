import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { privateProcedure, publicProcedure, router } from "./trps";
import { TRPCError } from '@trpc/server'
import { db } from "@/lib/db";
import * as z from 'zod'

export const appRouter = router({
    authCallback: publicProcedure.query(async () => {
        const { getUser } = getKindeServerSession()
        const user = getUser()
        console.log(user)
        if (!user.email || !user.id) {
            throw new TRPCError({ code: 'UNAUTHORIZED' })
        }

        const dbUser = await db.user.findFirst({
            where: {
                id: user?.id!
            }
        })

        if (!dbUser) {
            await db.user.create({
                data: {
                    id: user?.id!,
                    email: user?.email
                }
            })
        }

        return { success: true }
    }),

    getUserFiles: privateProcedure.query(async ({ ctx }) => {
        const { userId } = ctx

        return await db.file.findMany({
            where: {
                userId
            },
            orderBy: {
                created_at: 'desc'
            }
        })
    }),

    deleteFile: privateProcedure.input(z.object({
        id: z.string().min(1, ' ')
    })).mutation(async ({ ctx, input }) => {
        const { userId } = ctx
        const { id } = input

        const file = await db.file.findFirst({
            where: {
                id,
                userId
            }
        })

        if (!file) throw new TRPCError({ code: `NOT_FOUND` })

        await db.file.delete({
            where: {
                id,
                userId
            }
        })
    }),

    getFile: privateProcedure.input(z.object({
        key: z.string().min(1, ' ')
    })).mutation(async ({ ctx, input }) => {
        const { userId } = ctx
        const { key } = input

        if (!userId) throw new TRPCError({ code: 'UNAUTHORIZED' })
        if (!key) throw new TRPCError({ code: 'BAD_REQUEST' })

        const file = await db.file.findFirst({
            where: {
                key,
                userId
            }
        })

        if (!file) throw new TRPCError({ code: 'NOT_FOUND' })

        return file

    }),

    getFileUploadStatus: privateProcedure.input(z.object({
        fileId: z.string()
    })).query(async ({ ctx, input }) => {
        const { userId } = ctx
        const { fileId } = input
        if (!userId) throw new TRPCError({ code: 'UNAUTHORIZED' })

        const status = await db.file.findFirst({
            where: {
                userId,
                id: fileId
            },
            select: {
                uploadStatus: true
            }
        })

        if (!status) return { status: 'PENDING' as const }

        return { status: status.uploadStatus }
    })
});

export type AppRouter = typeof appRouter;