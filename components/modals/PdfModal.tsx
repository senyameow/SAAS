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

const PdfModal = () => {


    const { isOpen, onClose, type } = useModalStore()

    const isModalOpen = isOpen && type === 'pdfModal'

    // const onDrop = useCallback((acceptedFile: FileType) => {
    //     startUpload(file)
    //     setFile(acceptedFile);
    // }, []);


    return (
        <Modal isOpen={isModalOpen} onClose={onClose} className='min-w-[1200px]'>
            <ScrollArea className='h-[calc(100vh-6rem)]'>

            </ScrollArea>
        </Modal>
    )
}

export default PdfModal