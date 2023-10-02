import { Loader2 } from 'lucide-react'
import React, { Dispatch, SetStateAction } from 'react'
import toast from 'react-hot-toast'
import { Document, Page, PageProps } from 'react-pdf'

interface DocumentProps {
    degree?: number;
    zoom?: number;
    height?: number;
    pageNumber?: number;
    url: string;
    width?: number;
    numPages: number;
    setNumPages: Dispatch<SetStateAction<number | undefined>>;
    pages?: React.FC<PageProps>;
    fullDoc?: boolean
}


const Pdf = ({ degree, zoom, height, pageNumber, url, width, numPages, setNumPages, fullDoc = false }: DocumentProps) => {

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    return (
        <Document file={url} onLoadSuccess={onDocumentLoadSuccess} className={`h-full border-b`} loading={
            <div className='flex items-center justify-center max-h-full'>
                <Loader2 className='w-6 h-6 animate-spin' />
            </div>
        }
            onError={() => {
                toast.error('loading error.. try again')
            }}
        >
            {!fullDoc && <Page rotate={degree} scale={zoom} height={height ? height : 1} pageNumber={pageNumber} width={width ? width : 1} />}

            {fullDoc && (
                <div>
                    {new Array(numPages).fill(0).map((_, index) => (
                        <Page pageIndex={index} height={height ? height : 1} width={width ? width : 1} />
                    ))}
                </div>
            )}
        </Document>
    )
}

export default Pdf