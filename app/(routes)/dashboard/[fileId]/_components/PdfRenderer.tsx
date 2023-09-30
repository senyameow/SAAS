import { ArrowDown, ArrowUp } from 'lucide-react'
import React from 'react'

const PdfRenderer = () => {
    return (
        <div className='rounded-xl bg-white shadow-md flex flex-col items-start h-full'>
            <div className='h-14 px-6 pt-2 w-full border-b border-zinc-800 flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <ArrowDown />
                    <span>2</span>
                    <span>2</span>
                    <ArrowUp />
                </div>
            </div>
            <div className='h-'>
                qweqwe
            </div>
        </div>
    )
}

export default PdfRenderer