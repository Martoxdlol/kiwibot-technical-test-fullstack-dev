"use client"

import { FlatButton } from "@repo/ui/flat-button";
import type { Order, OrderStatus } from "database";
import { CheckCheckIcon, CheckIcon, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { patchJSON } from "~/lib/api";

export function OrderButtons({ order }: { order: Order }) {

    const [loading, setLoading] = useState(false)
    const router = useRouter()

    function handleUpdateStatus(status: OrderStatus) {
        setLoading(true)
        patchJSON(`/api/orders/${order!.id}`, { status }).then(() => {
            router.refresh()
            setLoading(false)
        }).catch(e => {
            setLoading(false)
            console.error(e)
        })
    }

    return <>
        {order.status === 'PENDING' && <li>
            <FlatButton
                className="w-full"
                disabled={loading}
                onClick={() => handleUpdateStatus('IN_PROGRESS')}
            >
                {loading ? <Loader2Icon className="animate-spin" /> : <CheckIcon />} Accept the order
            </FlatButton>
        </li>}
        {order.status !== 'COMPLETED' && <li>
            <FlatButton
                className="w-full text-secondary"
                disabled={loading}
                onClick={() => handleUpdateStatus('COMPLETED')}
            >
                {loading ? <Loader2Icon className="animate-spin" /> : <CheckCheckIcon />} Mark as completed
            </FlatButton>
        </li>}
    </>
}