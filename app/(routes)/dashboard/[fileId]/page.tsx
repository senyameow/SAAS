import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { db } from '@/lib/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { notFound, redirect } from 'next/navigation'
import React from 'react'
import PdfRenderer from './_components/PdfRenderer'
import ChatWrapper from './_components/ChatWrapper'

const page = async ({ params }: { params: { fileId: string } }) => {

    const { getUser } = getKindeServerSession()
    const user = getUser()

    if (!user || !user.id) redirect(`/auth-callback?origin=dashboard/${params.fileId}`)

    const file = await db.file.findFirst({
        where: {
            id: params.fileId,
            userId: user.id
        }
    })

    if (!file) notFound()

    return (
        <MaxWidthWrapper className='h-full max-w-[1400px]'>
            <div className='pt-20 px-6 pb-4 flex flex-col md:flex-row h-full gap-4'>
                <div className='rounded-xl flex-1 h-[calc(100vh-5.5rem)]'>
                    <PdfRenderer url={file.url} name={file.name} />
                </div>
                <div className='border h-full shrink-0 flex-[0.7] lg:w-96'>
                    <ChatWrapper />
                </div>
            </div>
        </MaxWidthWrapper>
    )
}

export default page