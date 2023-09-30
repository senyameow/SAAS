'use client'
import React, { useState } from 'react'
import { Modal } from '../ui/Modal'
import { useModalStore } from '@/hooks/use-modal-store'
import Dropzone from 'react-dropzone'
import { Cloud, File, Plus } from 'lucide-react'
import { Progress } from '../ui/progress'

const UploadModal = () => {

    const [isUploading, setIsUploading] = useState(false)
    const [progress, setProgress] = useState(0)

    const { isOpen, onClose, type } = useModalStore()

    const isModalOpen = isOpen && type === 'uploadModal'

    const startProgress = () => {
        setProgress(0)

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 95) {
                    prev - 3
                    clearInterval(interval)
                    return prev
                }
                return prev + 5
            })
        }, 500)
    }


    return (
        <Modal title='drag and drop Your pdf file' description='our AI will analize it in seconds' isOpen={isModalOpen} onClose={onClose}>
            <Dropzone multiple={false} onDragEnter={() => {
                setIsUploading(false)
            }} onDrop={(acceptedFile) => {
                setIsUploading(true)
                startProgress()
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
                            {acceptedFiles && acceptedFiles[0] && (
                                <div className='bg-white flex h-full w-full items-center justify-center overflow-hidden outline outline-[1px]'>
                                    <div className=' flex flex-1 items-center justify-center h-full w-full max-w-xs place-items-center'>
                                        <div className='flex items-center truncate border'>
                                            <File className='w-12 h-12 text-blue-800' />
                                            <p className='p-2 truncate text-blue-700' >{acceptedFiles[0].name}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {isUploading && (
                                <div className='w-full h-[100px] max-w-xs mx-auto flex items-start place-items-start'>
                                    <Progress value={progress} className='h-[4px]' />
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