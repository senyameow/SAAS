import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {

    const { getUser } = getKindeServerSession();
    const user = getUser();

    if (!user || !user.id) redirect('/auth-callback')

    return (
        <div className='pt-16'>{user.id}</div>
    )
}

export default page