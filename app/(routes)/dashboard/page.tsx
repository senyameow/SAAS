import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import React from 'react'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db';
import Dashboard from './_components/Dashboard';

const page = async () => {

    const { getUser } = getKindeServerSession();
    const user = getUser();

    if (!user?.id || !user) {
        redirect(`/auth-callback?origin=dashboard`)
    }

    const dbUser = await db.user.findFirst({
        where: {
            id: user.id
        }
    })

    if (!dbUser) {
        redirect(`/auth-callback?origin=dashboard`)
    }

    return (
        <Dashboard />
    )
}

export default page