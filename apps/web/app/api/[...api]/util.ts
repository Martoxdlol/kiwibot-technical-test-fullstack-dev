import { Context, Next } from "hono"
import { HTTPException } from "hono/http-exception"
import parsePhoneNumber from 'libphonenumber-js'
import { z } from "zod"
import { getAuthServerSession } from "~/server/auth"

export const phoneNumberSchema = z.string().transform(v => parsePhoneNumber(v)).refine((v) => {
    return v?.isValid() === true
}, {
    message: 'Invalid phone number'
}).transform(v => v?.number!)

export function validateBody<T>(schema: z.Schema<T>, values: unknown): T {
    try {
        return schema.parse(values)
    } catch (e) {
        const isDev = process.env.NODE_ENV === 'development'
        if (isDev) console.error(e)

        let message = 'Invalid Request Body'

        if (e instanceof z.ZodError) {
            message = e.errors.map((e) => e.message).join(', ')
        }

        throw new HTTPException(400, { message })
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
        return c.json({ message: err.message }, err.status)
    }

    return c.json({ message: 'An error occurred' }, 500)
}