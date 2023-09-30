'use client'
import React from 'react'
import { Modal } from '../ui/Modal'
import { useModalStore } from '@/hooks/use-modal-store'
import Dropzone from 'react-dropzone'
import { Plus } from 'lucide-react'

const UploadModal = () => {

    const { isOpen, onClose, type } = useModalStore()

    const isModalOpen = isOpen && type === 'uploadModal'


    return (
        <Modal title='drag and drop Your pdf file' description='our AI will analize it in seconds' isOpen={isModalOpen} onClose={onClose}>
            <Dropzone multiple={false} onDrop={(acceptedFile) => {
                console.log(acceptedFile)
            }} >
                {({ getRootProps, getInputProps, acceptedFiles }) => (
                    <div {...getRootProps()} className='h-[300px] border border-dashed rounded-lg'>
                        <input {...getInputProps()} />
                        <label htmlFor='dropzone' className='w-full h-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 cursor-pointer'>
                            <div className='w-full h-full flex items-center justify-center '>
                                <p className='italic text-sm'>drag and drop</p>
                            </div>
                        </label>
                    </div>
                )}
            </Dropzone>
        </Modal>
    )
}

export default UploadModal