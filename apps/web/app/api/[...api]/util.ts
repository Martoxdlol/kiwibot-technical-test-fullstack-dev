import { Context, Next } from "hono"
import { HTTPException } from "hono/http-exception"
import phone, { PhoneValidResult } from "phone"
import { z } from "zod"
import { getAuthServerSession } from "~/server/auth"

export const phoneNumberSchema = z.string().refine((v) => phone(v).isValid).transform((v) => (phone(v) as PhoneValidResult).phoneNumber)

export function validateBody<T>(schema: z.Schema<T>, values: unknown): T {
    try {
        return schema.parse(values)
    } catch (e) {
        throw new HTTPException(400, { message: 'Invalid Request Body' })
    }
}

export const authedMiddleware = async (c: Context, n: Next) => {
    const session = await getAuthServerSession()
    if (!session) {
        throw new HTTPException(401, { message: 'Not Authenticated' })
    }
    return n()
}

export function appOnErrorHandler(err: Error, c: Context) {
    if (err instanceof HTTPException) {
        return err.getResponse()
    }

    console.error(err)

    return c.json({ message: 'An error occurred' }, 500)
}