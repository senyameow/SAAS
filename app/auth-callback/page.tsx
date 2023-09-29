'use client'
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const page = () => {

    const router = useRouter()

    const searchParams = useSearchParams()

    return (
        <div>page</div>
    )
}

export default page