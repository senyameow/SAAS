'use client'
import React, { useCallback, useState } from 'react'
import { Modal } from '../ui/Modal'
import { useModalStore } from '@/hooks/use-modal-store'
import Dropzone from 'react-dropzone'
import { Cloud, File, Loader2, Plus } from 'lucide-react'
import { Progress } from '../ui/progress'
import { useUploadThing } from '@/lib/uploadthing'
import toast from 'react-hot-toast'
import { File as FileType } from '@prisma/client'
import { trpc } from '@/app/_trpc/client'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ScrollArea } from '../ui/scroll-area'
import Pdf from '../Pdf'
import { useResizeDetector } from 'react-resize-detector'
import SimpleBar from 'simplebar-react'

const PdfModal = () => {


    const { isOpen, onClose, type, data } = useModalStore()

    const isModalOpen = isOpen && type === 'pdfModal'

    const { width, ref, height } = useResizeDetector()

    const degree = data?.degree
    const url = data?.url
    const pageNumber = data?.degree
    const numPages = data?.numPages
    const setNumPages = data?.setNumPages


    return (
        <Modal isOpen={isModalOpen} onClose={onClose} className='min-w-[1200px]'>
            <ScrollArea className='h-[calc(100vh-6rem)]'>
                <SimpleBar autoHide={false} className='max-h-[calc(100vh-10rem)]'>
                    <div ref={ref} className='border-b max-h-full'>

                        <Pdf fullDoc pageNumber={pageNumber!} url={url!} degree={degree} height={height} width={width} setNumPages={setNumPages!} numPages={numPages!} />

                    </div>
                </SimpleBar>
            </ScrollArea>
        </Modal>
    )
}

export default PdfModal