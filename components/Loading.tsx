import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import React from 'react'

interface LoadingProps {
    title: string;
    description?: string;
    spinnerColor?: string
}

const Loading = ({ title, description, spinnerColor = 'text-blue-500' }: LoadingProps) => {
    return (
        <div className='flex flex-col gap-2 items-center h-full justify-center flex-1'>
            <Loader2 className={cn(`w-6 h-6 animate-spin`, spinnerColor)} />
            <h3 className='text-2xl font-semibold'>{title}</h3>
            <p className='text-neutral-500 text-sm'>{description}</p>
        </div>
    )
}

export default Loading