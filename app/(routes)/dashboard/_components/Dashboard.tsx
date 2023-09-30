'use client'
import { trpc } from '@/app/_trpc/client'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Ghost, Loader2 } from 'lucide-react'
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import File from './File'

const Dashboard = () => {

    const { data, isLoading } = trpc.getUserFiles.useQuery()

    return (
        <MaxWidthWrapper className='mt-24 sm:mt-36 w-full h-full'>
            <div className='flex flex-col gap-6 items-start w-full h-full'>
                <div className='flex items-center justify-between w-full '>
                    <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold'>My Files</h1>
                    <Button className='text-lg'>
                        Upload PDF
                    </Button>
                </div>
                <Separator className='w-full' />

                {data && data.length > 0 ? (
                    <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {data.map(file => (
                            <File key={file.id} name={file.name} id={file.id} url={file.url} created_at={file.created_at} />
                        ))}
                    </ul>
                ) : isLoading ? (
                    <>
                        <Skeleton className='h-24 w-full' />
                        <Skeleton className='h-12 w-full' />
                        <Skeleton className='h-12 w-full' />
                        <Skeleton className='h-12 w-full' />
                        <Skeleton className='h-12 w-full' />
                    </>
                ) : (
                    <div className='mt-16 flex flex-col items-center gap-2 w-full'>
                        <Ghost className='w-8 h-8 animate-bounce' />
                        <h3 className='text-xl'>It seems there is only a ghost here..</h3>
                        <p>Upload your first pdf!</p>
                    </div>
                )}

            </div>
        </MaxWidthWrapper>
    )
}

export default Dashboard