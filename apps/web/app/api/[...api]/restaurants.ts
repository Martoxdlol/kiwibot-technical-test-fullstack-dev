import { Hono } from "hono"
import { appOnErrorHandler, authedMiddleware, phoneNumberSchema, validateBody } from "./util"
import { prisma } from "database"
import { z } from "zod"

export const restaurantsApp = new Hono()

restaurantsApp.get('/', authedMiddleware, async (c) => {
    const restaurants = await prisma.restaurant.findMany({
        select: {
            id: true,
            name: true,
            address: true,
            country: true,
        }
    })

    return c.json({ restaurants })
})

restaurantsApp.post('/', authedMiddleware, async (c) => {
    const input = validateBody(z.object({
        name: z.string().trim().min(1).max(255),
        address: z.string().trim().min(1).max(255),
        country: z.string().trim().min(1).max(255),
        phoneNumber: phoneNumberSchema,
        creationIdempotencyKey: z.string(),
    }), await c.req.json())

    const r = await prisma.restaurant.create({
        data: input
    })

    return c.json({ message: 'Restaurant Created', entityId: r.id })
})


restaurantsApp.patch('/:id', authedMiddleware, async (c) => {
    const input = validateBody(z.object({
        name: z.string().optional(),
        address: z.string().optional(),
        country: z.string().optional(),
        phoneNumber: phoneNumberSchema.optional(),
    }), await c.req.json())

    const id = c.req.param('id')

    await prisma.restaurant.update({
        where: { id },
        data: input
    })

    return c.json({ message: 'Restaurant Updated' })
})


restaurantsApp.delete('/:id', authedMiddleware, async (c) => {
    const id = c.req.param('id')

    await prisma.restaurant.delete({
        where: { id },
    })

    return c.json({ message: 'Restaurant Deleted' })
})

restaurantsApp.onError(appOnErrorHandler)
