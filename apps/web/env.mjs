import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        NEXTAUTH_SECRET: z.string().min(1),
        GOOGLE_CLIENT_ID: z.string().min(1),
        GOOGLE_CLIENT_SECRET: z.string().min(1),
        DATABASE_PRISMA_URL: z.string().min(1),
        DATABASE_URL_NON_POOLING: z.string().min(1),
    },
    runtimeEnv: {
        ...process.env,
    },
});