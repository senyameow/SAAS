'use client'
import { ArrowDown, ArrowUp, ChevronDown, ChevronUp, Loader2 } from 'lucide-react'
import React, { useState } from 'react'

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { Document, Page, pdfjs } from 'react-pdf'
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useResizeDetector } from 'react-resize-detector'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`


interface PdfRendererProps {
    url: string;
    name: string;
}

const PdfRenderer = ({ url, name }: PdfRendererProps) => {

    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);

    const { width, ref, height } = useResizeDetector()

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    const onPageDown = () => {
        setPageNumber(prev => (prev - 1 >= 1 ? prev - 1 : prev))
        console.log(pageNumber)
    }
    const onPageUp = () => {
        setPageNumber(prev => (prev + 1 <= numPages! ? prev + 1 : prev))
        console.log(pageNumber)
    }

    return (
        <div className='w-full bg-white rounded-md shadow flex flex-col items-center h-full'>
            <div className='h-14 w-full border-b border-zinc-200 flex items-center max-h-screen justify-between px-2'>
                <div className='flex items-center gap-2 py-2'>
                    <Button onClick={onPageDown} variant={'ghost'}>
                        <ChevronDown className='w-4 h-4' />
                    </Button>
                    <Input value={pageNumber} className={cn(`outline-offset-0 ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-[40px] text-center`)} />
                    <div>/</div>
                    <div>{numPages ?? <Loader2 className='w-2 h-2 animate-spin' />}</div>
                    <Button disabled={numPages === undefined} onClick={onPageUp} variant={'ghost'}>
                        <ChevronUp className='w-4 h-4' />
                    </Button>
                </div>
            </div>
            <div className='flex-1 w-full max-h-full border border-zinc-200'>
                <div ref={ref} className='border-b max-h-full'>
                    <Document file={url} onLoadSuccess={onDocumentLoadSuccess} className={`h-full border-b`} loading={
                        <div className='flex items-center justify-center max-h-full'>
                            <Loader2 className='w-6 h-6 animate-spin' />
                        </div>
                    }
                        onError={() => {
                            toast.error('loading error.. try again')
                        }}
                    >
                        <Page height={height ? height : 1} pageNumber={pageNumber} width={width ? width : 1} />
                    </Document>

                </div>
            </div>
        </div>
    )
}

export default PdfRenderer