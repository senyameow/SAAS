import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MessageCircle, Plus, Trash } from 'lucide-react';
import Link from 'next/link'
import React from 'react'
import { format } from 'date-fns'

interface FileProps {
    name: string;
    url: string;
    id: string;
    created_at: string;
}

const File = ({ name, url, id, created_at }: FileProps) => {
    return (
        <Link href={`/dashboard/${id}`} className='w-full border border-black/60 hover:shadow-md'>
            <div className='flex flex-col gap-2 px-6 pt-6 pb-4 w-full h-full'>
                <div className='flex flex-row items-center gap-6 '>
                    <div className='w-10 h-10 rounded-full bg-blue-400' />
                    <div className='text-xl font-semibold'>{name}</div>
                </div>
                <Separator className='w-full' />
                <div className='w-full flex justify-around items-center'>
                    <div className='flex items-center gap-2 '>
                        <Plus className='w-4 h-4 ' />
                        {format(new Date(created_at), 'MMM yyyy')}
                    </div>
                    <div className='flex items-center gap-2 '>
                        <MessageCircle className='w-4 h-4 ' />
                        <span>{name}</span>
                    </div>
                    <Button variant={'destructive'} className='w-full'>
                        <Trash className='w-4 h-4' />
                    </Button>

                </div>
            </div>
        </Link>
    )
}

export default File