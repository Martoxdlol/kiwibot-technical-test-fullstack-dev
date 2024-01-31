import { Hono } from "hono"
import { appOnErrorHandler, authedMiddleware, phoneNumberSchema, validateBody } from "./util"
import { prisma } from "database"
import { z } from "zod"
import { ordersApp } from "./orders"

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
        name: z.string(),
        address: z.string(),
        country: z.string(),
        phoneNumber: phoneNumberSchema,
    }), await c.req.json())

    await prisma.restaurant.create({
        data: input
    })

    return c.json({ message: 'Restaurant Created' })
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

ordersApp.onError(appOnErrorHandler)
