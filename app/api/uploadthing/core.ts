import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { PineconeStore } from 'langchain/vectorstores/pinecone'
import { getPineconeClient } from "@/lib/pinecone";

const f = createUploadthing();

const handleAuth = () => {
    const { getUser } = getKindeServerSession()
    const user = getUser()

    if (!user.id || !user.email) throw new Error('Unathorized')
    return { userId: user.id }
}

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {

    FreePlan: f({ pdf: { maxFileSize: '4MB', maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(async ({ metadata, file }) => {
            const pdf = await db.file.create({
                data: {
                    key: file.key,
                    name: file.name,
                    url: file.url,
                    userId: metadata.userId,
                    uploadStatus: 'PROCESSING'
                }
            })

            try {
                const res = await fetch(`https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`)
                const blob = await res.blob()

                console.log(res)

                const loader = new PDFLoader(blob)
                const docs = await loader.load()

                console.log(docs)

                const pagesNum = docs.length
                const pinecone = await getPineconeClient()

                console.log(pinecone)

                const pineconeIndex = pinecone.Index('pdf-saas')

                const embeddings = new OpenAIEmbeddings({
                    openAIApiKey: process.env.OPENAI_API_KEY
                })

                await PineconeStore.fromDocuments(docs, embeddings, {
                    pineconeIndex,
                    namespace: pdf.id
                })

                await db.file.update({
                    where: {
                        id: pdf.id
                    },
                    data: {
                        uploadStatus: 'SUCCESS'
                    }
                })

            } catch (error) {
                console.log(error)
                await db.file.update({
                    where: {
                        id: pdf.id
                    },
                    data: {
                        uploadStatus: 'FAILED'
                    }
                })
            }
        }),

    ProPlan: f({ pdf: { maxFileSize: '16MB', maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(async ({ metadata, file }) => {
            const pdf = await db.file.create({
                data: {
                    key: file.key,
                    name: file.name,
                    url: file.url,
                    userId: metadata.userId,
                    uploadStatus: 'PROCESSING'
                }
            })

            try {
                const res = await fetch(`https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`)
                const blob = await res.blob()

                console.log(res)

                const loader = new PDFLoader(blob)
                const docs = await loader.load()

                console.log(docs)

                const pagesNum = docs.length
                const pinecone = await getPineconeClient()

                console.log(pinecone)

                const pineconeIndex = pinecone.Index('pdf-saas')

                const embeddings = new OpenAIEmbeddings({
                    openAIApiKey: process.env.OPENAI_API_KEY
                })

                await PineconeStore.fromDocuments(docs, embeddings, {
                    pineconeIndex,
                    namespace: pdf.id
                })

                await db.file.update({
                    where: {
                        id: pdf.id
                    },
                    data: {
                        uploadStatus: 'SUCCESS'
                    }
                })

            } catch (error) {
                console.log(error)
                await db.file.update({
                    where: {
                        id: pdf.id
                    },
                    data: {
                        uploadStatus: 'FAILED'
                    }
                })
            }
        }),


} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;