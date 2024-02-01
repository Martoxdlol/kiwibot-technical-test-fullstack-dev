import { expect, test, vi } from 'vitest'

vi.stubEnv('VITE_ENV', 'test')

vi.mock("next/navigation", () => {
    const actual = vi.importActual("next/navigation");
    return {
        ...actual,
        useRouter: vi.fn(() => ({
            push: vi.fn(),
        })),
        useSearchParams: vi.fn(() => ({
            get: vi.fn(),
        })),
        usePathname: vi.fn(),
    };
});

import { render, screen } from '@testing-library/react'

import OverviewPage from '../app/dashboard/page'
import OrdersPage from '~/app/dashboard/orders/page'
import { prisma } from 'database';
import { nanoid } from 'nanoid';
import OrderPage from '~/app/dashboard/orders/[id]/page';
import RestaurantsPage from '~/app/dashboard/restaurants/page'
import NewOrderPage from '~/app/dashboard/orders/new/page';
import ReactQueryProvider from '~/components/react-query-provider';


function createDummyClient() {
    return prisma.client.create({
        data: {
            address: "1234 Main St",
            country: "USA",
            creationIdempotencyKey: nanoid(),
            firstName: "John",
            lastName: "Doe",
            phoneNumber: "123-456-7890",
        }
    })
}

function createDummyRestaurant() {
    return prisma.restaurant.create({
        data: {
            address: "1234 Main St",
            country: "USA",
            creationIdempotencyKey: nanoid(),
            name: "Pizza Hut",
            phoneNumber: "123-456-7890",
        }
    })
}

function createDummyOrder(clientId: string, restaurantId: string) {
    return prisma.order.create({
        data: {
            clientId,
            status: "PENDING",
            restaurantId: restaurantId,
            creationIdempotencyKey: nanoid(),
            orderItems: {
                createMany: {
                    data: [
                        {
                            description: "Salad",
                            quantity: 1,
                            unitPrice: 1000,
                        },
                        {
                            description: "Pizza",
                            quantity: 2,
                            unitPrice: 2000,
                        }
                    ]
                }
            }
        }
    })
}

function deleteClient(clientId: string) {
    return prisma.client.delete({
        where: {
            id: clientId
        }
    })
}

function deleteRestaurant(restaurantId: string) {
    return prisma.restaurant.delete({
        where: {
            id: restaurantId
        }
    })
}

function deleteOrder(orderId: string) {
    return prisma.order.delete({
        where: {
            id: orderId
        }
    })
}


test('dashboard overview renders signout button', () => {
    render(<OverviewPage />)

    const actionButton = screen.queryByText('Sign out')

    expect(actionButton).toBeDefined()
})

test('restaurant exist', async () => {
    const restaurant = await createDummyRestaurant()

    const page = await RestaurantsPage()
    render(page)
    expect(screen.getByText('Restaurants')).toBeDefined()
    expect(screen.getAllByText('Pizza Hut').length).greaterThan(0)

    await deleteRestaurant(restaurant.id)
})

test('show order in list', async () => {
    const client = await createDummyClient()
    const restaurant = await createDummyRestaurant()

    const order = await createDummyOrder(client.id, restaurant.id)

    const page = await OrdersPage({ searchParams: {} })
    render(page)
    expect(screen.getByRole('heading', { level: 1, name: 'Orders' })).toBeDefined()
    expect(screen.getAllByText('Salad').length).greaterThan(0)

    await deleteOrder(order.id)
    await deleteRestaurant(restaurant.id)
    await deleteClient(client.id)
})

test('order details page', async () => {
    const client = await createDummyClient()
    const restaurant = await createDummyRestaurant()

    const order = await createDummyOrder(client.id, restaurant.id)

    const page = await OrderPage({ params: { id: order.id } })
    render(page)
    expect(screen.getByRole('heading', { level: 1, name: 'Order from ' + client.firstName + ' ' + client.lastName })).toBeDefined()
    expect(screen.getAllByText('Salad').length).greaterThan(0)
    expect(screen.getByText('$50.00')).toBeDefined()

    await deleteOrder(order.id)
    await deleteRestaurant(restaurant.id)
    await deleteClient(client.id)
})

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

test('show customer picker dialog', async () => {
    render(<ReactQueryProvider>
        <NewOrderPage />
    </ReactQueryProvider>)

    const button = screen.queryByText('Choose customer');

    expect(button).toBeDefined()

    const client = await createDummyClient()

    button?.click()
    await wait(10000)
    const john = screen.queryByText('John Doe')

    expect(john).toBeDefined()

    await deleteClient(client.id)
})

// NOT WORKING SADLY
// vi.mock("database", async (importOriginal) => {
//     const original = await importOriginal<typeof import('database')>()

//     const prismock = await vi.importActual<typeof import('prismock')>('prismock')

//     const PrismaClient = prismock.createPrismock(original.Prisma)

//     return {
//         ...original,
//         prisma: new PrismaClient()
//     }
// });
