import { Hono } from "hono";
import { appOnErrorHandler, validateBody } from "./util";
import { z } from "zod";
import { prisma } from "database";

export const ordersApp = new Hono()

ordersApp.post('/', async (c) => {
    const input = validateBody(z.object({
        customerId: z.string(),
        restaurantId: z.string(),
        items: z.array(z.object({
            description: z.string(),
            unitPrice: z.number(),
            quantity: z.number(),
        })),
    }), await c.req.json())

    await prisma.order.create({
        data: {
            client: { connect: { id: input.customerId } },
            restaurant: { connect: { id: input.restaurantId } },
            orderItems: {
                create: input.items.map(item => ({
                    description: item.description,
                    unitPrice: item.unitPrice,
                    quantity: item.quantity,
                    status: 'PENDING',
                }))
            }
        }
    })

    return c.json({ message: 'Order Created' })
})

ordersApp.patch('/:id', async (c) => {
    const orderId = c.req.param('id')
    const input = validateBody(z.object({
        status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED'])
    }), await c.req.json())

    await prisma.order.update({
        where: { id: orderId },
        data: { status: input.status }
    })

    return c.json({ message: 'Order Updated' })
})

ordersApp.onError(appOnErrorHandler)