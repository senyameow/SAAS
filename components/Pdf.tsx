// import { Loader2 } from 'lucide-react'
// import React from 'react'
// import toast from 'react-hot-toast'
// import { Document, Page } from 'react-pdf'

// interface DocumentProps {

// }

// const Pdf = ({ degree, zoom, height, pageNumber, url, width, onDocumentLoadSuccess }) => {
//     return (
//         <Document file={url} onLoadSuccess={onDocumentLoadSuccess} className={`h-full border-b`} loading={
//             <div className='flex items-center justify-center max-h-full'>
//                 <Loader2 className='w-6 h-6 animate-spin' />
//             </div>
//         }
//             onError={() => {
//                 toast.error('loading error.. try again')
//             }}
//         >
//             <Page rotate={degree} scale={zoom} height={height ? height : 1} pageNumber={pageNumber} width={width ? width : 1} />
//         </Document>
//     )
// }

// export default Pdf