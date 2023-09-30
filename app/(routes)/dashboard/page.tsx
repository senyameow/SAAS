import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import React from 'react'
import { redirect } from 'next/navigation'

const page = () => {

    const { getUser } = getKindeServerSession();
    const user = getUser();

    if (!user?.id || !user) {
        redirect(`/auth-callback?origin=dashboard`)
    }

    return (
        <div className='pt-16'>{user.id}</div>
    )
}

export default page