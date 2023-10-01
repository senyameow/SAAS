import { auth } from "@clerk/nextjs";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = () => {
    const { getUser } = getKindeServerSession()
    const user = getUser()

    if (!user.id || !user.email) throw new Error('Unathorized')
    return { userId: user.id }
}

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {

    FreePlan: f({ pdf: { maxFileSize: '32MB', maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(async ({ metadata, file }) => { }),

    ProPlan: f({ pdf: { maxFileSize: '16MB', maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(async ({ metadata, file }) => { }),


} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;