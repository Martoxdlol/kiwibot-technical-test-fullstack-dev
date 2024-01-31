import { prisma } from "database";
import { Hono } from "hono";
import { appOnErrorHandler, authedMiddleware, phoneNumberSchema, validateBody } from "./util";
import { z } from "zod";

export const clientsApp = new Hono()

clientsApp.get('/', authedMiddleware, async (c) => {
    const clients = await prisma.client.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            address: true,
            country: true,
        }
    })

    return c.json({ clients })
})

clientsApp.post('/', authedMiddleware, async (c) => {
    const input = validateBody(z.object({
        firstName: z.string(),
        lastName: z.string(),
        address: z.string(),
        country: z.string(),
        phoneNumber: phoneNumberSchema,
    }), await c.req.json())

    await prisma.client.create({
        data: input
    })

    return c.json({ message: 'Client Created' })
})


clientsApp.patch('/:id', authedMiddleware, async (c) => {
    const input = validateBody(z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        address: z.string().optional(),
        country: z.string().optional(),
        phoneNumber: phoneNumberSchema.optional(),
    }), await c.req.json())

    const id = c.req.param('id')

    await prisma.client.update({
        where: { id },
        data: input
    })

    return c.json({ message: 'Client Updated' })
})

clientsApp.delete('/:id', authedMiddleware, async (c) => {
    const id = c.req.param('id')

    await prisma.client.delete({
        where: { id },
    })

    return c.json({ message: 'Client Deleted' })
})

clientsApp.onError(appOnErrorHandler)
