import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { env } from "../../../../env.mjs"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        }),
    ]
})

export { handler as GET, handler as POST }