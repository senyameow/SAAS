import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'
import Messages from './Messages'
import ChatInput from './ChatInput'

const ChatWrapper = () => {
    return (
        <div className='min-h-full relative bg-zinc-50 flex flex-col justify-between gap-2 border'>
            <div className='flex-1 border border-black mb-28 flex flex-col'>
                <Messages />
            </div>
            <ChatInput />
        </div>
    )
}

export default ChatWrapper