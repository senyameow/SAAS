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

const UploadModal = () => {

    const router = useRouter()

    const [isUploading, setIsUploading] = useState(false)
    const [progress, setProgress] = useState(0)

    const { isOpen, onClose, type } = useModalStore()

    const isModalOpen = isOpen && type === 'uploadModal'

    const startProgress = () => {
        setProgress(0)

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 95) {
                    clearInterval(interval)
                    return prev
                }
                return prev + 5
            })
        }, 500)

        return interval
    }

    const { startUpload, permittedFileInfo } = useUploadThing('FreePlan', {
        onClientUploadComplete: () => {
            toast.success(`you successfully uploaded the file!`)
            setProgress(100)
        },
        onUploadError: () => {
            toast.error(`something went wrong =( `)
        },
        onUploadBegin: () => {
            setIsUploading(true)
        }
    })

    const { mutate: getFile } = trpc.getFile.useMutation({
        onSuccess: (file) => {
            onClose()
            router.push(`/dashboard/${file.id}`)
            setIsUploading(false)
        },
        retry: true,
        retryDelay: 500
    })

    // const onDrop = useCallback((acceptedFile: FileType) => {
    //     startUpload(file)
    //     setFile(acceptedFile);
    // }, []);


    return (
        <Modal title='drag and drop Your pdf file' description='our AI will analize it in seconds' isOpen={isModalOpen} onClose={onClose}>
            <Dropzone multiple={false} onDrop={async (acceptedFile) => {
                try {
                    setIsUploading(true)
                    const progressInterval = startProgress()

                    const res = await startUpload(acceptedFile)

                    if (!res || res.length === 0) toast.error(`something went wrong`)
                    const [fileRes] = res!
                    const key = fileRes.key
                    if (!key) toast.error(`something went wrong`)

                    clearInterval(progressInterval)

                    getFile({ key })
                } catch (error) {
                    toast.error(`something went wrong`)
                }

            }} >
                {({ getRootProps, getInputProps, acceptedFiles }) => (
                    <div {...getRootProps()} className='h-[300px] border border-dashed rounded-lg'>
                        <input {...getInputProps()} />
                        <label htmlFor='dropzone' className='w-full h-full flex-col flex items-center justify-center bg-gray-50 hover:bg-gray-100 cursor-pointer'>
                            {!acceptedFiles || !acceptedFiles[0] && <div className='w-full h-full flex items-center justify-center flex-col '>
                                <Cloud className='w-8 h-8 animate-pulse ' />
                                <p className='mb-2 text-sm text-zinc-700'><span className='font-semibold'>click to upload</span> {' '}
                                    <span className=''>or drag and drop</span></p>
                                <p className='text-xs text-zinc-500'>File up to 4MB</p>
                            </div>}
                            {acceptedFiles && acceptedFiles[0] && !isUploading && (
                                <div className='bg-white flex h-full w-full items-center justify-center overflow-hidden outline outline-[1px]'>
                                    <div className=' flex items-center justify-center flex-1 w-full max-w-xs place-items-center'>
                                        <div className='flex items-center truncate border'>
                                            <File className='w-12 h-12 text-blue-800' />
                                            <p className='p-2 truncate text-blue-700' >{acceptedFiles[0].name}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {isUploading && (
                                <div className='w-full pb-24 h-[300px] bg-white border border-black mx-auto flex items-center flex-col gap-4 justify-center place-items-center'>
                                    <div className='text-zinc-700 font-semibold'>Uploading Your file..</div>
                                    <Progress indicatorColor={progress === 100 ? 'bg-green-500' : ''} value={progress} className={cn(`h-[4px] w-[90%] mx-auto`)} />
                                    {progress === 100 && (
                                        <div className='flex items-center text-zinc-700 flex-col gap-1 bg-white w-full'>
                                            <Loader2 className='w-4 h-4 animate-spin' />
                                            <span>redirecting...</span>
                                        </div>

                                    )}
                                </div>

                            )}
                        </label>
                    </div>
                )}
            </Dropzone>
        </Modal>
    )
}

export default UploadModal