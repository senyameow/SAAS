import { cn } from '@/lib/utils'
import { Loader2, LucideIcon } from 'lucide-react'
import React from 'react'

interface LoadingProps {
    title: string;
    description?: string;
    iconClassName?: string;
    icon: LucideIcon;
}

const Loading = ({ title, description, iconClassName = 'text-blue-500 animate-spin', icon = Loader2 }: LoadingProps) => {

    const Icon = icon

    return (
        <div className='flex flex-col gap-2 items-center h-full justify-center flex-1'>
            <Icon className={cn(`w-6 h-6`, iconClassName)} />
            <h3 className='text-2xl font-semibold'>{title}</h3>
            <p className='text-neutral-500 text-sm'>{description}</p>
        </div>
    )
}

export default Loading