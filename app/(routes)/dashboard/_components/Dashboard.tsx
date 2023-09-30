import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import React from 'react'

const Dashboard = () => {
    return (
        <MaxWidthWrapper className='mt-24 sm:mt-36 w-full h-full'>
            <div className='flex flex-col gap-6 items-start w-full h-full'>
                <div className='flex items-center justify-between w-full '>
                    <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold'>My Files</h1>
                    <Button>
                        Upload PDF
                    </Button>
                </div>
                <Separator className='w-full' />
            </div>
        </MaxWidthWrapper>
    )
}

export default Dashboard