import { db } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";


export async function POST(req: Request, { params }: { params: { fileId: string } }) {

    try {

        const { getUser } = getKindeServerSession()
        const user = getUser()

        console.log(user)
        console.log(params?.fileId)

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

        return NextResponse.json(message, { status: 200 })

    } catch (error) {
        console.log(error)
        return new NextResponse(`Internal error`, { status: 500 })
    }
}

export async function GET(req: Request, { params }: { params: { fileId: string } }) {

    try {

        const { getUser } = getKindeServerSession()
        const user = getUser()

        if (!user.id || !user.email) return new NextResponse('Unauthorized', { status: 400 })

        const message = await db.message.findMany({
            where: {
                fileId: params.fileId,
            },
            orderBy: {
                created_at: 'asc'
            }
        })

        return NextResponse.json(message, { status: 200 })

    } catch (error) {
        return new NextResponse(`Internal error`, { status: 500 })
    }
}