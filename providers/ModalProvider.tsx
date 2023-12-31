'use client'

import PdfRenderer from "@/app/(routes)/dashboard/[fileId]/_components/PdfRenderer"
import PdfModal from "@/components/modals/PdfModal"
import UploadModal from "@/components/modals/UploadModal"
import { useEffect, useState } from "react"


export const ModalProvider = () => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <>
            <UploadModal />
            <PdfModal />
        </>
    )
}