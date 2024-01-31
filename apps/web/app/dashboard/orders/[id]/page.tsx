import { prisma } from "database";
import dayjs from "dayjs";
import { CalendarCheckIcon, CalendarClockIcon, CalendarDaysIcon, ChefHatIcon, CookingPotIcon, DollarSignIcon, FlagIcon, MapPinIcon, PhoneIcon, StoreIcon, UserIcon } from "lucide-react";
import PageContent from "~/components/page-content";
import { cn } from "~/lib/utils";

import relativeTime from "dayjs/plugin/relativeTime";
import { OrderButtons } from "./buttons";
dayjs.extend(relativeTime)


export default async function OrderPage(props: { params: { id: string } }) {
    const order = await prisma.order.findUnique({
        where: {
            id: props.params.id
        },
        include: {
            orderItems: true,
            client: true,
            restaurant: true,
        }
    })



    if (!order) {
        return <PageContent
            title="Order not found"
        >
            <h1>We couldn't find the order</h1>
        </PageContent>
    }

    const liClass = 'flex items-center gap-2 py-3'
    const totalPrice = order.orderItems.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0).toFixed(2)

    let status = 'Pending'
    let statusColor = 'text-orange-500'

    if (order.status === 'IN_PROGRESS') {
        status = 'In Progress'
        statusColor = 'text-black'
    } else if (order.status === 'COMPLETED') {
        status = 'Completed'
        statusColor = 'text-secondary'
    }




    return <PageContent
        title={`Order from ${order.client.firstName} ${order.client.lastName}`}
    >
        <div className="space-y-5">
            <div className="flex gap-5 flex-col md:flex-row">
                <ul className="w-full">
                    <li className={liClass}><UserIcon />{order.client.firstName} {order.client.lastName}</li>
                    <li className={liClass}><PhoneIcon />{order.client.phoneNumber}</li>
                    <li className={liClass}><FlagIcon />{order.client.country}</li>
                    <li className={liClass}><MapPinIcon />{order.client.address}</li>
                </ul>
                <ul className="w-full">
                    <li className={liClass}><StoreIcon />{order.restaurant.name}</li>
                    <li className={liClass}><PhoneIcon />{order.restaurant.phoneNumber}</li>
                    <li className={liClass}><FlagIcon />{order.restaurant.country}</li>
                    <li className={liClass}><MapPinIcon />{order.restaurant.address}</li>
                </ul>
            </div>
            <ul className="col-span-2">
                {order.orderItems.map(item => {
                    const totalPrice = item.quantity * item.unitPrice
                    return <li key={item.id} className={liClass}>
                        <CookingPotIcon />
                        <div>
                            <p>{item.description}</p>
                            <p className="text-xs">{item.quantity} * ${item.unitPrice.toFixed(2)} = ${totalPrice.toFixed(2)}</p>
                        </div>
                    </li>
                })}
            </ul>
            <ul>
                <li className={liClass}>
                    <DollarSignIcon />Total: <span className="font-semibold">${totalPrice}</span>
                </li>
                <li className={cn(liClass, statusColor)}>
                    <ChefHatIcon />{status}
                </li>
                <li className={liClass}>
                    <CalendarDaysIcon />Placed: {dayjs(order.createdAt).format('MMMM D, YYYY [at] h:mm A')} ({dayjs(order.createdAt).fromNow()})
                </li>
                {order.acceptedAt && <li className={liClass}>
                    <CalendarClockIcon />Accepted: {dayjs(order.acceptedAt).format('MMMM D, YYYY [at] h:mm A')} ({dayjs(order.acceptedAt).fromNow()})
                </li>}
                {order.completedAt && <li className={liClass}>
                    <CalendarCheckIcon />Completed: {dayjs(order.completedAt).format('MMMM D, YYYY [at] h:mm A')} ({dayjs(order.completedAt).fromNow()})
                </li>}
                <OrderButtons order={order} />
            </ul>
        </div>
    </PageContent>
}
