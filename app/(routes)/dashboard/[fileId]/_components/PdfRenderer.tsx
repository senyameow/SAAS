'use client'
import { ArrowDown, ArrowUp, ChevronDown, ChevronUp, Loader2 } from 'lucide-react'
import React, { useCallback, useState } from 'react'

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { Document, Page, pdfjs } from 'react-pdf'
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useResizeDetector } from 'react-resize-detector'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Zoom from './Zoom';

import SimpleBar from 'simplebar-react'

import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";



pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`


interface PdfRendererProps {
    url: string;
    name: string;
}

type onUpdateType = {
    x: number;
    y: number;
    scale: number;
}


const PdfRenderer = ({ url, name }: PdfRendererProps) => {

    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);

    const inputSchema = z.object({
        page: z.string().min(1, ' ').refine(num => (Number(num) > 0) && (Number(num) <= numPages!), ' ')
    })

    const { register, setValue, handleSubmit, formState } = useForm<z.infer<typeof inputSchema>>({
        resolver: zodResolver(inputSchema),
        defaultValues: {
            page: '1'
        }
    })

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

    const onSubmit = (values: z.infer<typeof inputSchema>) => {
        console.log('ZCXC')
        setPageNumber(Number(values.page))
        setValue('page', String(values.page))
    }

    const [zoom, setZoom] = useState(1)

    const onUpdate = useCallback(({ x, y, scale }: onUpdateType) => {
        const { current: doc } = ref;

        if (doc) {
            const value = make3dTransformValue({ x, y, scale });

            console.log(value)

            setZoom((prev) => scale < prev ? prev : scale)

            // doc.style.setProperty("transform", value);
        }
    }, []);


    return (
        <div className='w-full bg-white rounded-md shadow flex flex-col items-center h-full'>
            <div className='h-14 w-full border-b border-zinc-200 flex items-center max-h-screen justify-between px-2'>
                <div className='flex items-center gap-2 py-2 w-full'>
                    <Button onClick={onPageDown} variant={'ghost'}>
                        <ChevronDown className='w-4 h-4' />
                    </Button>
                    <Input {...register('page')} onKeyDown={e => {
                        if (e.key === 'Enter') {
                            handleSubmit(onSubmit)()
                        }
                    }} className={cn(`outline-offset-0 ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-[40px] text-center`, formState.errors.page && 'focus-visible:outline-rose-400', numPages! > 99 && 'w-fit')} />
                    <div>/</div>
                    <div>{numPages ?? <Loader2 className='w-2 h-2 animate-spin' />}</div>
                    <Button disabled={numPages === undefined} onClick={onPageUp} variant={'ghost'}>
                        <ChevronUp className='w-4 h-4' />
                    </Button>
                    <div className='ml-auto flex items-center gap-2 w-full justify-end'>
                        <Zoom setZoom={setZoom} zoom={zoom} />
                    </div>
                </div>
            </div>
            <div className='flex-1 w-full max-h-full border border-zinc-200'>
                <SimpleBar autoHide={false} className='max-h-[calc(100vh-10rem)]'>
                    <QuickPinchZoom onUpdate={onUpdate}>
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
                                <Page scale={zoom} height={height ? height : 1} pageNumber={pageNumber} width={width ? width : 1} />
                            </Document>

                        </div>
                    </QuickPinchZoom>
                </SimpleBar>
            </div>
        </div>
    )
}

export default PdfRenderer