import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { publicProcedure, router } from "./trps";
import { TRPCError } from '@trpc/server'

export const appRouter = router({
    authCallback: publicProcedure.query(() => {

        throw new TRPCError({ code: 'UNAUTHORIZED' })
    })
});

export type AppRouter = typeof appRouter;