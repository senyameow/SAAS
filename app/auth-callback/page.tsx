'use client'
import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { trpc } from '../_trpc/client'
import { Loader2 } from 'lucide-react'

const page = () => {

    const router = useRouter()

    const searchParams = useSearchParams()
    const origin = searchParams.get('origin')

    trpc.authCallback.useQuery(undefined, {
        onSuccess: ({ success }) => {
            if (success) {
                router.push(origin ? `/${origin}` : '/dashboard')
            }
        },
        onError: (err) => {
            if (err.data?.code === 'UNAUTHORIZED') {
                router.push(`sign-in`)
            }
        }
    })

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='flex flex-col items-center gap-2'>
                <Loader2 className='animate-spin w-16 h-16 text-zinc-800' />
                <span className='text-4xl font-semibold'>Setting up your account...</span>
            </div>
        </div>
    )

}

export default page