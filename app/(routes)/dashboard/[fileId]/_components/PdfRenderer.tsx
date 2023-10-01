'use client'
import { ArrowDown, ArrowUp, Loader2 } from 'lucide-react'
import React, { useState } from 'react'

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { Document, Page, pdfjs } from 'react-pdf'
import toast from 'react-hot-toast';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`


interface PdfRendererProps {
    url: string;
    name: string;
}

const PdfRenderer = ({ url, name }: PdfRendererProps) => {

    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    return (
        <div className='w-full bg-white rounded-md shadow flex flex-col items-center'>
            <div className='h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2'>
                <div className='flex items-center gap-2'>
                    <ArrowDown />
                    <span>2</span>
                    <span>2</span>
                    <ArrowUp />
                </div>
            </div>
            <div className='flex-1 w-full max-h-screen border border-zinc-200'>
                <div className=''>
                    <Document file={url} onLoadSuccess={onDocumentLoadSuccess} className={`max-h-full border-b`} loading={
                        <div className='flex items-center justify-center h-full'>
                            <Loader2 className='w-6 h-6 animate-spin' />
                        </div>
                    }
                        onError={() => {
                            toast.error('loading error.. try again')
                        }}
                    >
                        <Page pageIndex={1} pageNumber={pageNumber} />
                    </Document>

                </div>
            </div>
        </div>
    )
}

export default PdfRenderer