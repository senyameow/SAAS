import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { publicProcedure, router } from "./trps";
import { TRPCError } from '@trpc/server'
import { db } from "@/lib/db";

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
    })
});

export type AppRouter = typeof appRouter;