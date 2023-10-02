import { db } from "@/lib/db";
import { openai } from "@/lib/openai";
import { getPineconeClient } from "@/lib/pinecone";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { NextResponse } from "next/server";

import { OpenAIStream, StreamingTextResponse } from 'ai'


export async function POST(req: Request, { params }: { params: { fileId: string } }) {

    try {

        const { getUser } = getKindeServerSession()
        const user = getUser()

        const { content } = await req.json()

        if (!content) return new NextResponse('No message provided', { status: 401 })

        if (!user.id || !user.email) return new NextResponse('Unauthorized', { status: 400 })

        const message = await db.message.create({
            data: {
                userId: user.id,
                content,
                fileId: params?.fileId,
                isUserMessage: true
            }
        })

        const embeddings = new OpenAIEmbeddings({
            openAIApiKey: process.env.OPENAI_API_KEY
        })
        const pinecone = await getPineconeClient()
        const pineconeIndex = pinecone.Index('pdf-saas')
        const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
            pineconeIndex,
            namespace: params.fileId
        })

        const results = await vectorStore.similaritySearch(
            content,
            4
        )

        const messages = await db.message.findMany({
            where: {
                fileId: params.fileId,
            },
            orderBy: {
                created_at: 'asc'
            },
            take: 2
        })

        const formattedMessages = messages.map(msg => ({
            role: msg.isUserMessage ? 'user' : 'assistent',
            content: msg.content
        }))

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            temperature: 0,
            stream: true,
            messages: [
                {
                    role: 'system',
                    content:
                        'Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format.',
                },
                {
                    role: 'user',
                    content: `Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format. \nIf you don't know the answer, just say that you don't know, don't try to make up an answer.
                  
            \n----------------\n
            
            PREVIOUS CONVERSATION:
            ${formattedMessages.map((message) => {
                        if (message.role === 'user') return `User: ${message.content}\n`
                        return `Assistant: ${message.content}\n`
                    })}
            
            \n----------------\n
            
            CONTEXT:
            ${results.map((r) => r.pageContent).join('\n\n')}
            
            USER INPUT: ${message}`,
                },
            ],
        })

        const stream = OpenAIStream(response, {
            async onCompletion(completion) {
                await db.message.create({
                    data: {
                        content: completion,
                        isUserMessage: false,
                        fileId: params.fileId,
                        userId: user.id as string
                    }
                })
            }
        })

        return new StreamingTextResponse(stream)

    } catch (error) {
        console.log(error)
        return new NextResponse(`Internal error`, { status: 500 })
    }
}

// export async function GET(req: Request, { params }: { params: { fileId: string } }) {

//     try {

//         const { getUser } = getKindeServerSession()
//         const user = getUser()

//         if (!user.id || !user.email) return new NextResponse('Unauthorized', { status: 400 })

//         const message = await db.message.findMany({
//             where: {
//                 fileId: params.fileId,
//             },
//             orderBy: {
//                 created_at: 'asc'
//             }
//         })

//         return NextResponse.json(message, { status: 200 })

//     } catch (error) {
//         return new NextResponse(`Internal error`, { status: 500 })
//     }
// }