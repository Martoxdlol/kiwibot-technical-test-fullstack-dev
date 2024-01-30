import { AuthOptions, getServerSession } from "next-auth";

import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "database"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { env } from "~/env.mjs";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        }),
    ]
}

export function getAuthServerSession() {
    return getServerSession(authOptions)
}