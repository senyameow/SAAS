'use client'
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { trpc } from '../_trpc/client'

const page = async () => {

    const router = useRouter()

    const searchParams = useSearchParams()
    const origin = searchParams.get('origin')

    trpc.authCallback.useQuery(undefined, {
        onSuccess: ({ success }) => {
            if (success) {
                // create user in db
                router.push(origin ? `/${origin}` : '/dashboard')
            } else {
                router.push(`/404`)
            }
        }
    })

}

export default page