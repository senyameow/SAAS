import { cn } from '@/lib/utils';
import Image from 'next/image'
import React from 'react'

interface ImageWithContainerProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    imageclassName?: string;
    ringClassname?: string
}

const ImageWithContainer = ({ src, alt, width, height, imageclassName, ringClassname }: ImageWithContainerProps) => {
    return (
        <div className="mt-8 sm:mt-16 flow-root">
            <div className={cn(`-m-2 rounded-xl bg-gray-900/5 p-4 ring-1 ring-inset ring-gray-900/10`, ringClassname)}>
                <Image src={src} alt={alt} width={width} height={height} className={cn(`rounded-xl border border-gray-900/5 p-6 bg-white`, imageclassName)} />
            </div>
        </div>
    )
}

export default ImageWithContainer