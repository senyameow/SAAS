import Loading from '@/components/Loading'
import React from 'react'

interface ChatLoadingProps {
    status: 'PROCESSING' | 'PENDING' | 'LOADING'
}

const ChatLoading = ({ status }: ChatLoadingProps) => {
    return (
        <>
            {status === 'LOADING' && (
                <Loading title='Loading...' description='We are loading Your pdf..' />
            )}
            {status === 'PROCESSING' && (
                <Loading title='Processing...' description='We are processing Your pdf..' />
            )}
            {status === 'PENDING' && (
                <Loading title='Uploading...' description='It will not take long' />
            )}
        </>
    )
}

export default ChatLoading