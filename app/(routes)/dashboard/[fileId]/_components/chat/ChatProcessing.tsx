import Loading from '@/components/Loading'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronLeft, Loader2, XCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface ChatProcessingProps {
    status: 'PROCESSING' | 'PENDING' | 'LOADING' | 'FAILED'
}

const ChatProcessing = ({ status }: ChatProcessingProps) => {
    return (
        <>
            {status === 'LOADING' && (
                <Loading icon={Loader2} title='Loading...' description='We are loading Your pdf..' />
            )}
            {status === 'PROCESSING' && (
                <Loading icon={Loader2} title='Processing...' description='We are processing Your pdf..' />
            )}
            {status === 'PENDING' && (
                <Loading icon={Loader2} title='Uploading...' description='It will not take long' />
            )}
            {status === 'FAILED' && (
                <div className='flex flex-col gap-2'>
                    <Loading icon={XCircle} iconClassName='text-rose-500 animate-pulse w-8 h-8' title='Ooops..' description='Free plan allows your pdf to contain up to 5 pages' />
                    <div className='w-full flex items-center justify-center'>
                        <Link href={'/dashboard'} className={cn(buttonVariants({ variant: 'ghost' }))}>
                            <ChevronLeft className='w-4 h-4' />
                            Back
                        </Link>
                    </div>
                </div>
            )}
        </>
    )
}

export default ChatProcessing