import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { TRPCError, initTRPC } from '@trpc/server';

const t = initTRPC.create();

const middleware = t.middleware

const isAuth = middleware(async otps => {
    const { getUser } = getKindeServerSession()
    const user = getUser()

    if (!user || !user.id) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
    }

    return otps.next({
        ctx: {
            userId: user.id,
            user
        }
    })
})

export const privateProcedure = t.procedure.use(isAuth)
export const router = t.router;
export const publicProcedure = t.procedure;