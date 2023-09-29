import Link from 'next/link';
import React from 'react'

interface StepProps {
    number: number;
    title: string;
    description: string;
    link?: string
    href?: string
}

const Step = ({ number, title, description, link, href }: StepProps) => {
    return (
        <div className='w-full pt-4 border-t-4 text-start border-black/40'>
            <div className='flex flex-col gap-2 items-start'>
                <span className='text-blue-600 text-xs'>Step {number}</span>
                <span className='text-[16px] font-bold '>{title}</span>
                <p className='text-beutral-400 text-sm'>{description} {link && href && <Link href={href} className='underline text-blue-500 hover:text-blue-600'>{link}</Link>}.</p>
            </div>
        </div>
    )
}

export default Step