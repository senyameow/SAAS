'use client'
import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'
import Messages from './Messages'
import ChatInput from './ChatInput'
import { trpc } from '@/app/_trpc/client'
import { Loader2 } from 'lucide-react'
import ChatLoading from './ChatLoading'

const ChatWrapper = ({ fileId }: { fileId: string }) => {


    const { data, isLoading } = trpc.getFileUploadStatus.useQuery({ fileId })

    return (
        <div className='min-h-full relative bg-zinc-50 flex flex-col justify-between gap-2 border'>
            <div className='flex-1 border border-black mb-28 flex flex-col'>
                {isLoading && <ChatLoading status='LOADING' />}
                {!isLoading && data?.status === 'PENDING' && <ChatLoading status='PENDING' />}
                {!isLoading && data?.status === 'PROCESSING' && <ChatLoading status='PROCESSING' />}
                {!isLoading && data?.status === 'SUCCESS' && <Messages />}
            </div>
            <ChatInput isDisabled={isLoading} />
        </div>
    )
}

export default ChatWrapper