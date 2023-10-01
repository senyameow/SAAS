'use client'
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Loader2, MessageCircle, Plus, Trash } from 'lucide-react';
import Link from 'next/link'
import React from 'react'
import { format } from 'date-fns'
import { trpc } from '@/app/_trpc/client';

interface FileProps {
    name: string;
    url: string;
    id: string;
    created_at: string;
}

const File = ({ name, url, id, created_at }: FileProps) => {

    const utils = trpc.useContext()

    const { mutate: deleteFile, isLoading } = trpc.deleteFile.useMutation({
        onSuccess: () => {
            utils.getUserFiles.invalidate()
        },
    })

    return (
        <div className='w-full border border-black/30 hover:shadow-md transition rounded-xl'>
            <div className='flex flex-col gap-2 px-6 pt-6 pb-4 w-full h-full'>
                <Link href={`/dashboard/${id}`} className='flex flex-row items-center gap-6 '>
                    <div className='w-10 h-10 rounded-full bg-blue-400 shrink-0' />
                    <div className='text-xl font-semibold truncate'>{name}</div>
                </Link>
                <Separator className='w-full' />
                <div className='w-full flex justify-around items-center gap-2'>
                    <div className='flex items-center gap-2 flex-1 justify-center text-sm'>
                        <Plus className='w-4 h-4 ' />
                        {format(new Date(created_at), 'MMM yyyy')}
                    </div>
                    <div className='flex items-center gap-2 flex-1 justify-center truncate'>
                        <MessageCircle className='w-4 h-4 shrink-0' />
                        <span className='truncate text-sm'>{name}</span>
                    </div>
                    <Button onClick={() => deleteFile({ id })} disabled={isLoading} variant={'destructive'} className='w-full flex-1'>
                        {isLoading ? <Loader2 className='w-4 h-4 animate-spin' /> : <Trash className='w-4 h-4' />}
                    </Button>

                </div>
            </div>
        </div>
    )
}

export default File