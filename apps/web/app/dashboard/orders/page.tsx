import PageContent from "~/components/page-content"
import { NewOrderButton } from "./new-order-button"
import { OrderStatus, prisma } from "database"
import OrderTile from "~/components/order-tile"
import dayjs from 'dayjs'
import { OrdersFilterRow } from "./orders-filters-row"

export default async function OrdersPage({ searchParams }: { searchParams: { date?: string, status?: string, clientId?: string, restaurantId?: string, } }) {
    const statusStr = searchParams.status

    const showStatus: OrderStatus[] = []

    const lastDate = dayjs(searchParams.date).endOf('day').toDate()
    const firstDate = dayjs(searchParams.date).subtract(7, 'day').startOf('day').toDate()

    if (statusStr === undefined) {
        showStatus.push('PENDING', 'IN_PROGRESS')
    } else {
        const status = statusStr.split(',')
        for (const s of status) {
            if (s === 'PENDING' || s === 'IN_PROGRESS' || s === 'COMPLETED') {
                showStatus.push(s as OrderStatus)
            }
        }
    }

    const orders = await prisma.order.findMany({
        include: {
            orderItems: true,
            restaurant: true,
            client: true
        },
        where: {
            status: {
                in: showStatus
            },
            restaurantId: searchParams.restaurantId,
            clientId: searchParams.clientId,
            OR: [
                {
                    updatedAt: {
                        gte: firstDate,
                        lte: lastDate,
                    }
                },
                {
                    createdAt: {
                        gte: firstDate,
                        lte: lastDate,
                    }
                },
                {
                    completedAt: {
                        gte: firstDate,
                        lte: lastDate,
                    }
                }
            ]
        },
        orderBy: {
            updatedAt: 'desc'
        }
    })

    return <PageContent
        title={<h1>Orders</h1>}
        floatingActionButton={<NewOrderButton />}
    >
        <OrdersFilterRow />
        {orders.map(order => <OrderTile key={order.id} order={order} />)}
        <div className="h-[50px]"/>
    </PageContent>
}