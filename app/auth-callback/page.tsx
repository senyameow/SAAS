'use client'
import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { trpc } from '../_trpc/client'
import { Loader2 } from 'lucide-react'

const page = async () => {

    const router = useRouter()

    const searchParams = useSearchParams()
    const origin = searchParams.get('origin')
    const { data, error } = trpc.authCallback.useQuery(undefined, {
        retry: true,
        retryDelay: 500
    });

    useEffect(() => {
        if (data?.success) {
            router.push(origin ? `/${origin}` : '/dashboard');
        }
        if (error?.data?.code === 'UNAUTHORIZED') {
            router.push(`/sing-in`)
        }
    }, [data, router, origin]);

    return (
        <div className='flex items-center justify-center h-full'>
            <div className='flex flex-col items-center gap-2'>
                <Loader2 className='animate-spin w-8 h-8 text-zinc-800' />
                <span className='text-4xl font-semibold'>Setting up your account...</span>
            </div>
        </div>
    )

}

export default page