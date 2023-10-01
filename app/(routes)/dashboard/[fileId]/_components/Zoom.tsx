'use client'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown, Loader2, Search } from 'lucide-react';

interface ZoomProps {
    setZoom: Dispatch<SetStateAction<number>>;
    zoom: number
}

const Zoom = ({ setZoom, zoom }: ZoomProps) => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return <Loader2 className='w-4 h-4 animate-spin' />

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button className='flex flex-row items-center gap-1 focus-visible:ring-0 ring-offset-0 focus-visible:ring-offset-0 focus:ring-0' variant={'ghost'}>
                    <Search className='w-4 h-4' />
                    <span>{zoom * 100}%</span>
                    <ChevronDown className='w-4 h-4' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => setZoom(1.25)} className='cursor-pointer text-center flex items-center justify-center'>
                    125%
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setZoom(1.5)} className='cursor-pointer text-center flex items-center justify-center'>
                    150%
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setZoom(2)} className='cursor-pointer text-center flex items-center justify-center'>
                    200%
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setZoom(2.5)} className='cursor-pointer text-center flex items-center justify-center'>
                    250%
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Zoom