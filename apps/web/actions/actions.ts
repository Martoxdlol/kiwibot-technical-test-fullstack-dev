"use server"

import { prisma } from "database"
import { getAuthServerSession } from "~/server/auth"

export async function getCustomers() {
    const session = getAuthServerSession()
    if (!session) throw new Error("Unauthorized")

    return await prisma.client.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            address: true,
            country: true,
        }
    })
}

export async function getRestaurants() {
    const session = getAuthServerSession()
    if (!session) throw new Error("Unauthorized")

    return await prisma.restaurant.findMany({
        select: {
            id: true,
            name: true,
            address: true,
            country: true,
        }
    })
}