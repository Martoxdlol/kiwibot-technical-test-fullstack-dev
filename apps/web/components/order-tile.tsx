import type { Client, Order, OrderItem, Restaurant } from "database"
import { CookingPotIcon } from "lucide-react"
import Link from "next/link"
import OrderStatusDropdown from "./order-status-dropdown"
import dayjs from "dayjs"

type OrderInfo = Order & {
    orderItems: OrderItem[]
    restaurant: Pick<Restaurant, "name">
    client: Pick<Client, "firstName" | "lastName" | "address">
}

export default function OrderTile(props: {
    order: OrderInfo
}) {
    const totalPrice = props.order.orderItems.reduce((acc, item) => acc + item.unitPrice, 0)

    return <Link className="block mx-[-20px] p-[20px] relative hover:bg-stone-200 active:bg-stone-200" href={"/dashboard/orders/" + props.order.id}>
        <span className="md:absolute right-[20px] font-medium text-stone-500 flex gap-2">
            #{props.order.id.substring(props.order.id.length - 5)}
            <OrderStatusDropdown orderId={props.order.id} status={props.order.status} />
        </span>
        <p>
            {props.order.client.firstName} {props.order.client.lastName}
            {` • `}
            {props.order.restaurant.name}
        </p>
        <p className="text-xs mb-1">
            {props.order.client.address}
            {` - `}
            ${totalPrice.toFixed(2)}
            {` - `}
            {dayjs(props.order.updatedAt).format('MMM D, YYYY h:mm A')}
        </p>
        <div className="flex flex-nowrap gap-2 overflow-x-auto">
            {props.order.orderItems.map(item => <div key={item.id} className="flex items-center px-2 py-1 border border-primary-strong bg-primary shadow-sm rounded-md">
                <CookingPotIcon size={14} className="mr-1 shrink-0" />
                <span className="whitespace-nowrap shrink-0">{item.description}</span>
                <span className="bg-primary-strong rounded-sm block px-1 ml-1 whitespace-nowrap shrink-0">{item.quantity}</span>
            </div>)}
        </div>
    </Link>
}