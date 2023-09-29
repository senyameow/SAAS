import { cn } from '@/lib/utils';
import React from 'react'

interface HeadingProps {
    title: string;
    description?: string;
    classNameTitle?: string
    classNameDescr?: string
}

const Heading = ({ title, description, classNameTitle, classNameDescr }: HeadingProps) => {
    return (
        <div className='text-center'>
            <h1 className={cn(`text-4xl md:text-5xl xl:text-6xl font-bold max-w-2xl mb-6`, classNameTitle)}>{title}</h1>
            <p className={cn(`text-neutral-400 text-sm sm:text-[15px] max-w-xl mx-auto`, classNameDescr)}>{description} </p>
        </div>
    )
}

export default Heading